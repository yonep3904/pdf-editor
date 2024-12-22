import style from "./sidebar.module.css";

const Sidebar = ({ sectionList, refList }) => {
  const handleScroll = (ref) => {
    // if (!ref || !ref.current) {
    //   console.warn("Invalid ref or ref.current is null");
    //   return;
    // }

    const headerHeight = 70; // 固定されたヘッダーの高さ
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.sidebar}>
      {sectionList.map((section, sectionIndex) => (
        <div key={`section-${sectionIndex}`} className={style.sidebarSection}>
          <h3>{section.title}</h3>
          {section.contents.map((content, contentIndex) => (
            <button
              key={`section-${sectionIndex}-content-${contentIndex}`}
              onClick={() => handleScroll(refList[sectionIndex][contentIndex])}
              className={style.sidebarButton}
            >
              {content.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
