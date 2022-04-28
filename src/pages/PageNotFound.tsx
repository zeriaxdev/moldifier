import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-screen font-spaceMono bg-zinc-800 text-green-400 text-center">
      <div className="grid place-items-center justify-center h-screen">
        <h1 className="text-2xl">
          <b>
            <Link
              to={"/"}
              className="hover:underline bg-zinc-700 p-1 px-2 rounded-2xl"
            >
              404
            </Link>
          </b>{" "}
          - not found :(
        </h1>
      </div>
    </div>
  );
};

export default PageNotFound;
