import css from "./Loader.module.css";
import { RotatingLines } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="48"
        width="48"
        color="gray"
        strokeColor="#F20909"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
