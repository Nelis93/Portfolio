import React from "react";
import { PhoneIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { SocialIcon } from "react-social-icons";
import { useForm, SubmitHandler } from "react-hook-form";
import { PageInfo } from "../../typings";
import ReactWhatsapp from "react-whatsapp";
import PhoneHover from "./PhoneHover";

type Props = {
  pageInfo: PageInfo;
};
type Inputs = {
  name: string;
  company: string;
  subject: string;
  message: string;
};

const hover = {
  tooltipContent: (
    <p className="text-lg text-white">
      I see you like <span className="text-3xl">🥧</span>
      <br></br> try email instead
    </p>
  ),
  rest: <p className="text-[1em] cursor-not-allowed">+31 4 159 265 35</p>,
};

export default function Contact({ pageInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formdata) => {
    window.location.href = `mailto:${pageInfo.email}?subject=${formdata.subject}&body=${formdata.message} (${formdata.company})`;
  };

  return (
    <div className="h-screen text-[3vh] max-w-[100vh] sm:max-w-[100vw] flex relative text-left flex-col md:flex-row items-center justify-center px-10 md:items-start">
      <h3 className="absolute top-[12vh] md:top-[7vh] uppercase tracking-[10px] md:tracking-[20px] text-white text-[5vh]">
        Contact
      </h3>

      <div className="flex flex-col md:mt-[40vh] lg:mt-[20vh] max-w-screen justify-center items-center md:justify-start space-y-[5vh] ">
        <div className="flex flex-col justify-center items-center space-y-[2vh]">
          <div className="flex items-center space-x-5 justify-center">
            <PhoneIcon className="text-yellow-500 h-[3vh] w-[3vh] animate-pulse" />
            <PhoneHover {...hover}>{hover.rest}</PhoneHover>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <EnvelopeIcon className="text-yellow-500 h-[3vh] w-[3vh] animate-pulse" />
            <p className="text-[1em]">{pageInfo.email}</p>
          </div>
          <div className="flex items-center space-x-5 justify-center">
            <MapPinIcon className="text-yellow-500 h-[1em] w-[1em] animate-pulse" />
            <p className="text-[1em]">{pageInfo.address}</p>
          </div>
        </div>
        <div className="relative lg:hidden mx-auto pt-[10vh]">
          <ReactWhatsapp
            element="button"
            number={pageInfo.phoneNumber}
            message="Hi 🙂"
          >
            <SocialIcon
              network="whatsapp"
              bgColor="white"
              style={{ height: "10vh", width: "10vh" }}
            />
          </ReactWhatsapp>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="hidden lg:flex flex-col space-y-2 w-screen px-5 lg:w-fit h-[40vh] text-[2vh] mx-auto"
        >
          <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
            <input
              {...register("name")}
              placeholder="Name"
              className="contactInput"
              type="text"
            />
            <input
              {...register("company")}
              placeholder="Company"
              className="contactInput"
              type="text"
            />
          </div>
          <input
            {...register("subject")}
            placeholder="Subject"
            className="contactInput"
            type="text"
          />
          <textarea
            {...register("message")}
            placeholder="Message"
            className="contactInput"
          />
          <button
            type="submit"
            className="bg-teal-500 py-[1em] px-10 rounded-md text-white font-bold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
