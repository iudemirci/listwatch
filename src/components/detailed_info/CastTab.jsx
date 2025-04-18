import LinkToId from "../../ui/LinkToId";
import Paragraph from "../../ui/Paragraph";
import DetailedInfoButton from "./DetailedInfoButton";

function CastTab({ credits, expanded, setExpanded }) {
  const MAX_VISIBLE = 20;
  const visibleNames = expanded
    ? credits
    : credits?.slice(0, MAX_VISIBLE) || [];

  return (
    <div className="mt-4 flex flex-wrap gap-x-1 gap-y-1.5">
      {credits?.length === 0 ? (
        <Paragraph type="tertiary">No cast information found</Paragraph>
      ) : (
        <>
          {visibleNames?.map((credit, idx) => (
            <DetailedInfoButton key={idx}>
              <LinkToId type="person" item={credit}>
                {credit.name}
              </LinkToId>
            </DetailedInfoButton>
          ))}
          {visibleNames?.length > MAX_VISIBLE && !expanded && (
            <DetailedInfoButton
              className="border-grey-primary-light/50 border-1"
              onClick={() => setExpanded(true)}
            >
              Show All
            </DetailedInfoButton>
          )}
        </>
      )}
    </div>
  );
}

export default CastTab;
