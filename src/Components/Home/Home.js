import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bracelate from "../../Assets/Images/bracelate.jpg";
import charmNacklace from "../../Assets/Images/charmNacklace.jpg";
import banner from "../../Assets/Images/home_banner.png";
import nackless from "../../Assets/Images/Nackless.jpg";
import { onChangeHandler } from "../../Redux-action/action";
function Home() {
  const designs = [
    { img: nackless, name: "CENTER NECKLACES", type: "v-chain" },
    { img: bracelate, name: "BRACELETS", type: "bracelet" },
    { img: charmNacklace, name: "CHARM NECKLACES", type: "u-chain" },
  ];
  const state = useSelector((state) => state.state);
  const dispatch = useDispatch();
  let history = useHistory();
  return (
    <div>
      <img
        style={{
          position: "absolute",
          width: "150px",
          left: "calc(50% - 75px)",
          top: "15px",
        }}
        onClick={() => {
          alert("tamare navi tab khulvi pade");
          window.open("https://www.meiratdesigns.com/");
        }}
        src="https://custommeirat.com/assets/images/logo.png"
      />
      <i className="home_icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          class="bi bi-house-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
          />
          <path
            fill-rule="evenodd"
            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
          />
        </svg>
      </i>
      <img src={banner} width="100%" style={{ minHeight: "150px" }} />
      <div className="selectDesignView container">
        {designs.map((e) => (
          <div
            className="designBox"
            style={{ backgroundImage: `url(${e.img})` }}
          >
            {/* <img src={e.img} /> */}
            {/* <div className="boxText">{e.name}</div> */}
            <button
              name="productSelection"
              value={e.name}
              onClick={(e1) => {
                dispatch(onChangeHandler(e1));
                dispatch(
                  onChangeHandler({
                    target: {
                      value: e.type,
                      name: "necklaceType",
                    },
                  })
                );
                history.push("/builder");
              }}
            >
              {e.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
