// app/names/page.tsx

import { getRoute } from "../utilities";
import NameListComponent from "./NameListComponent";

const NameList = () => {

  return (
    <div>
      <NameListComponent getNameApi={getRoute("/api/names")} />
    </div>
  );
};

export default NameList;
