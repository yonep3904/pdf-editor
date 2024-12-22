import style from "./sidebar.module.css";

export function Sidebar(props) {
  const { sections, refs } = props;

  const handleScroll = (ref) => {
    const headerHeight = 70; // 固定されたヘッダーの高さ
    const elementPosition = ref.current.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className={style.sidebar}>
      {sections.map((section, sectionIndex) => (
        <div key={`section-${sectionIndex}`} className={style.sidebarSection}>
          <h3>{section.title}</h3>
          {section.contents.map((content, contentIndex) => (
            <button
              key={`section-${sectionIndex}-content-${contentIndex}`}
              onClick={() => handleScroll(refs[sectionIndex][contentIndex])}
              className={style.sidebarButton}
            >
              {content.title}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
