import Editor from "./editor";
import style from "./editor_contsiner.module.css";

const EditorSectionContainer = ({ editorList, refList }) => (
  <>
    {editorList.map((editor, index) => (
      <Editor {...editor} ref={refList[index]} key={index} />
    ))}
  </>
);

const EditorContainer = ({ sectionList, refList }) => {
  // コンテンツにジャンプする関数
  const scrollToContent = (sectionIndex, contentIndex) => {
    const targetRef = refs[sectionIndex][contentIndex];
    if (targetRef?.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={style.editorContainer}>
      {sectionList.map((section, sectionIndex) => (
        <div key={sectionIndex} className={style.editorSection}>
          <h2>{section.title}</h2>
          <EditorSectionContainer
            editorList={section.contents}
            refList={refList[sectionIndex]}
          />
        </div>
      ))}
    </div>
  );
};

export default EditorContainer;
