import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Button from "../../ui/Button";
import Github from "../../ui/Github";
import Title from "../../ui/Title";

import { openSignupPopup } from "../../store/popupSlice";

export default function GreetingText() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  return (
    <div className="mx-auto mt-[24rem] flex flex-col items-center gap-3 text-center sm:w-[350px] md:gap-3 lg:w-[450px] 2xl:w-[500px] 2xl:gap-6">
      <Title level={2}>
        List your favourite content. Track. Share. Don't miss any single thing.
      </Title>

      {!token ? (
        <Button size="big" onClick={() => dispatch(openSignupPopup())}>
          Sign up. For Free!
        </Button>
      ) : (
        <Button size="big_wide">
          <Link to="/discover">Discover now!</Link>
        </Button>
      )}

      <div className="2xl:-mt-2">
        <Github />
      </div>
    </div>
  );
}
