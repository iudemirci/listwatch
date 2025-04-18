import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import Title from "../../ui/Title";

function ListsTitle() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center gap-5 px-2 text-center sm:px-0">
      <Title level={4} className="font-normal">
        Group your films and shows into lists—perfect for organizing and sharing
        your collection.
      </Title>
      <Button
        type="secondary"
        size="default_wide"
        onClick={() => navigate("/discover")}
      >
        Start your own list
      </Button>
    </section>
  );
}

export default ListsTitle;
