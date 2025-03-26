import Button from "../ui/Button";
import Github from "../ui/Github";
import Title from "../ui/Title";

export default function GreetingText() {
  return (
    <div className="mx-auto mt-[24rem] flex flex-col items-center gap-3 text-center sm:w-[350px] md:gap-3 lg:w-[450px] 2xl:w-[500px] 2xl:gap-6">
      <Title level={2}>
        List your favourite content. Track. Share. Don't miss any single thing.
      </Title>
      <Button>Sign up. For Free!</Button>
      <Github />
    </div>
  );
}
