import Button from "./Button";
import Github from "./Github";
import PaddingBottom from "./PaddingBottom";
import Title from "./Title";

export default function GreetingText() {
  return (
    <PaddingBottom>
      <div className="mt-[25rem] flex flex-col items-center gap-3 text-center md:gap-3 lg:mt-[30rem] 2xl:mt-[35rem] 2xl:gap-4">
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
