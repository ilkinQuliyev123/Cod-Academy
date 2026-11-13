"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { EditorState, type Extension } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";

async function langExt(editor: string): Promise<Extension> {
  switch (editor) {
    case "javascript": return (await import("@codemirror/lang-javascript")).javascript();
    case "typescript": return (await import("@codemirror/lang-javascript")).javascript({ typescript: true });
    case "html": return (await import("@codemirror/lang-html")).html();
    case "css": return (await import("@codemirror/lang-css")).css();
    case "python": return (await import("@codemirror/lang-python")).python();
    case "sql": return (await import("@codemirror/lang-sql")).sql();
    case "cpp":
    case "csharp": return (await import("@codemirror/lang-cpp")).cpp(); // C# üçün yaxın sintaksis
    default: return [];
  }
}

const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "14px", backgroundColor: "#080b13" },
  ".cm-scroller": { fontFamily: "var(--font-mono)", lineHeight: "1.6" },
  ".cm-gutters": { backgroundColor: "#080b13", borderRight: "1px solid #1c2536" },
  "&.cm-focused": { outline: "none" },
});

/** CodeMirror 6 redaktoru. value yalnız ilk dəfə və dil/tapşırıq dəyişəndə tətbiq olunur. */
export default function Editor({ value, editor, onChange, onRun, resetKey }: {
  value: string; editor: string; onChange: (v: string) => void; onRun: () => void; resetKey: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const cb = useRef({ onChange, onRun });
  useEffect(() => { cb.current = { onChange, onRun }; });

  useEffect(() => {
    let view: EditorView | undefined;
    let dead = false;
    langExt(editor).then((lang) => {
      if (dead || !host.current) return;
      view = new EditorView({
        parent: host.current,
        state: EditorState.create({
          doc: value,
          extensions: [
            basicSetup,
            keymap.of([indentWithTab, { key: "Mod-Enter", run: () => (cb.current.onRun(), true) }]),
            oneDark, theme, lang,
            EditorView.updateListener.of((u) => u.docChanged && cb.current.onChange(u.state.doc.toString())),
          ],
        }),
      });
    });
    return () => { dead = true; view?.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- value yalnız resetKey dəyişəndə yenilənir
  }, [editor, resetKey]);

  return <div ref={host} className="h-full min-h-[320px] overflow-hidden" />;
}
