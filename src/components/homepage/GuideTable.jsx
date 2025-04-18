import {
  mdiInformation,
  mdiListBox,
  mdiMovie,
  mdiScaleBalance,
  mdiShare,
  mdiStar,
} from "@mdi/js";
import Paragraph from "../../ui/Paragraph";
import Icon from "@mdi/react";

function GuideTable() {
  const content = [
    {
      icon: <Icon path={mdiMovie} size={1.2} />,
      text: "Track every movie and show you’ve seen—or start fresh from today",
    },
    {
      icon: <Icon path={mdiStar} size={1.2} />,
      text: "Like your favorite titles, and set favourite items up to 4 to display in your profile",
    },
    {
      icon: <Icon path={mdiShare} size={1.2} />,
      text: "Share your thoughts through reviews and see what others are saying",
    },
    {
      icon: <Icon path={mdiScaleBalance} size={1.2} />,
      text: "Rate every title using a sleek five-star scale",
    },
    {
      icon: <Icon path={mdiInformation} size={1.2} />,
      text: "Instantly access rich, in-depth details on any movie or show",
    },
    {
      icon: <Icon path={mdiListBox} size={1.2} />,
      text: "Create themed lists and build a watchlist of what you want to see next",
    },
  ];

  return (
    <div className="grid grid-rows-2 gap-2 pt-2 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-2 2xl:pt-4">
      {content.map((item, i) => {
        return (
          <div
            className="bg-grey-secondary/75 hover:bg-grey-secondary flex items-center gap-2 rounded-2xl p-4 duration-300 lg:gap-2 lg:p-5"
            key={i}
          >
            <Paragraph>
              <span className="text-primary">{item.icon}</span>
            </Paragraph>
            <Paragraph type={"tertiary"}>{item.text}</Paragraph>
          </div>
        );
      })}
    </div>
  );
}

export default GuideTable;
