import style from "./buttons.module.css";
import { Button } from "antd";

interface Props {
  text: string;
  myFunction: (params: any) => any;
}

function ButtonFilter({ text, myFunction }: Props) {
  return (
    <Button className={style.BottonFilter} onClick={myFunction}>
      {text}
    </Button>
  );
}

export default ButtonFilter;