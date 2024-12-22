import { QuickEditor } from "./quick_editor";
import style from "./quick_editor_container.module.css";

export function QuickEditorContainer(props) {
  const { editorList , refList} = props;

  return (
    <div className={style.editorContainer}>
      {editorList.map((editor, index) => (
        <QuickEditor {...editor} ref={refList[index]} key={index}/>
      ))}
    </div>
  );
}
