import { FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-screen font-spaceMono bg-zinc-800 text-green-400 text-center">
      <div className="grid place-items-center justify-center h-screen">
        <div>
          <h1 className="text-2xl">
            <b>moldifier</b>: moldify your dreams
          </h1>
          <div className="grid grid-flow-row place-items-center">
            <a href={"https://github.com/zeriaxdev/moldifier"}>
              <FaGithub className="w-10 h-10 m-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
