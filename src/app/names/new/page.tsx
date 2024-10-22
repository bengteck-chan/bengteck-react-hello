// app/names/new/page.tsx
import { getRoute } from "../../utilities";
import AddFormComponent from "./AddFormComponent";

const AddName = () => {
  return (
    <div>
      <AddFormComponent addNameApiUrl={getRoute("/api/names")} />
    </div>
  );
};

export default AddName;
