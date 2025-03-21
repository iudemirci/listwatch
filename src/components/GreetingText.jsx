import Button from "../ui/Button";
import Github from "../ui/Github";
import PaddingBottom from "../ui/PaddingBottom";
import Title from "../ui/Title";

export default function GreetingText() {
  return (
    <PaddingBottom>
      <div className="mt-[25em] flex flex-col items-center gap-3 text-center md:gap-3 2xl:mt-[35rem] 2xl:gap-4">
        <Title level={2}>
          List your favourite content. Track. Share. Don't miss any single
          thing.
        </Title>
        <Github />
        <Button>Sign up. For Free!</Button>
      </div>
    </PaddingBottom>
  );
}
