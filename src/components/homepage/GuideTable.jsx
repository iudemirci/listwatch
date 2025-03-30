import Paragraph from "../../ui/Paragraph";

function GuideTable() {
  const content = [
    { icon: "📃", text: "Keep track by listing your favourite movies" },
    { icon: "⭐", text: "Rate movies as you keep track and record" },
    { icon: "↗️", text: "Share you watchlist with you friends" },
    { icon: "📰", text: "Write reviews for the world if you need to" },
    {
      icon: "ℹ️",
      text: "Get quick and detailed information about any movie",
    },
    {
      icon: "👯",
      text: "Interact with you friends and others with you lists",
    },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-1.5 pt-2 md:grid-cols-3 2xl:gap-2 2xl:pt-4">
      {content.map((item, i) => {
        return (
          <div
            className="bg-grey-secondary/75 hover:bg-grey-secondary flex items-center gap-1 rounded-2xl p-2.5 duration-300 md:p-2 lg:gap-2 lg:p-2.5 2xl:p-4"
            key={i}
          >
            <Paragraph>
              <span>{item.icon}</span>
            </Paragraph>
            <Paragraph type={"primary"}>{item.text}</Paragraph>
          </div>
        );
      })}
    </div>
  );
}

export default GuideTable;
