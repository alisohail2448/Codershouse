import React from "react";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";


const Home = () => {
    const navigate = useNavigate()
    const startRegistration = () => {
        navigate("/authenticate")
    }
  return (
    <>
      <div className="flex items-center  justify-center mt-[6rem]">
        <Card title="Welcome to Codershouse!" icon="logo">
          <p className="text-[22px] leading-9 text-[#c4c5c5] mb-[30px]">
            We’re working hard to get Codershouse! ready for everyone. While we
            wrap up the finishing touches. we’re adding people gradually to make
            sure nothing breaks {":)"}
          </p>
          {/* <Button onClick={startRegistration} title="Get your username" icon="arrow-forward" /> */}
          <Button onClick={startRegistration} title="Let's Go" icon="arrow-forward" />
          <div className="mt-[20px]">
            <span className="text-[#c4c5c5]">Have an invite text?</span>
            {/* <Link to="/login" className="signInText">
              Sign in
            </Link> */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
