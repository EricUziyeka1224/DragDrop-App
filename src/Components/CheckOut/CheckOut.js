import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import banner from "../../Assets/Images/home_banner.png";

function CheckOut() {
  const history = useHistory();
  const checkOutImage = useSelector((state) => state.checkOutImage);
  const checkOutPrice = useSelector((state) => state.checkOutPrice);
  const shopifyDropedItems = useSelector((state) => state.shopifyDropedItems);
  const necklaceType = useSelector((state) => state.necklaceType);
  const [quantity, setQuantity] = useState(1);

  const finalCheckout = () => {
    if (shopifyDropedItems?.length > 0 && necklaceType) {
      for (let k = 0; k < shopifyDropedItems.length; k++) {
        if (shopifyDropedItems[k]) {
          shopifyDropedItems[k].image_url = shopifyDropedItems[
            k
          ].image_url.replace(
            /^https?:\/\/[^\/]+/i,
            window.location.protocol + "//" + window.location.host + "/files"
          );
        }
      }
      // let chain_image = shopifyDropedItems[11].image_url;
      let totalPrice = 0;
      let mergeSimiliar = {};

      for (let i = 0; i < shopifyDropedItems.length; i++) {
        if (!shopifyDropedItems[i]) {
          continue;
        }
        if (!mergeSimiliar[shopifyDropedItems[i].shopify_id]) {
          mergeSimiliar[shopifyDropedItems[i].shopify_id] = 1;
        } else {
          mergeSimiliar[shopifyDropedItems[i].shopify_id]++;
        }
        totalPrice = totalPrice + Number(shopifyDropedItems[i].price);
      }

      axios
        .post("https://mtd1.com/api/media/upload_chain_image", {
          image: checkOutImage,
        })
        .then((response) => {
          let mergeSimiliar = {};
          let checkoutNotes = "";
          let indexTexts = [
            "First",
            "Second",
            "Third",
            "Fourth",
            "Fifth",
            "Sixth",
            "Seventh",
            "Eighth",
            "Ninth",
            "Tenth",
            "Main",
            "Chain",
          ];
          for (let i = 0; i < 12; i++) {
            let postfix = "&";
            if (
              shopifyDropedItems.length == 1 ||
              shopifyDropedItems.length - 1 == i
            ) {
              postfix = "";
            }
            if (!shopifyDropedItems[i]) {
              checkoutNotes =
                checkoutNotes +
                "attributes[" +
                indexTexts[i] +
                "]=" +
                "Empty" +
                postfix;
              continue;
            } else {
              checkoutNotes =
                checkoutNotes +
                "attributes[" +
                indexTexts[i] +
                "]=" +
                shopifyDropedItems[i].shopify_id +
                (shopifyDropedItems[i].notes
                  ? "-" + shopifyDropedItems[i].notes
                  : "") +
                postfix;
            }
            if (!mergeSimiliar[shopifyDropedItems[i].shopify_id]) {
              mergeSimiliar[shopifyDropedItems[i].shopify_id] = 1;
            } else {
              mergeSimiliar[shopifyDropedItems[i].shopify_id]++;
            }
          }
          let elementIndex = 0;
          let checkoutParams = "";
          let keys = Object.keys(mergeSimiliar);
          keys.forEach(function (singleElement) {
            if (keys.length == 1 || keys.length - 1 == elementIndex) {
              checkoutParams =
                checkoutParams +
                singleElement +
                ":" +
                mergeSimiliar[singleElement] * quantity;
            } else {
              checkoutParams =
                checkoutParams +
                singleElement +
                ":" +
                mergeSimiliar[singleElement] * quantity +
                ",";
            }
            elementIndex++;
          });
          checkoutNotes = checkoutNotes + "&attributes[quantity]=" + quantity;
          checkoutNotes =
            checkoutNotes + "&attributes[necklace_image]=" + response.path;
          window.location.href =
            "https://www.meiratdesigns.com" +
            "/cart/" +
            checkoutParams +
            "?" +
            checkoutNotes;
        })
        .catch((err) => {});
    } else {
      history.push("/");
    }
  };

  useEffect(() => {
    var htmlObject = document.createElement("div");
    htmlObject.innerHTML = checkOutImage;
    document.getElementById("checkOutImage").appendChild(htmlObject);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${banner})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <img
        style={{
          position: "absolute",
          width: "120px",
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
      <div className="checkOut container">
        <div id="checkOutImage"></div>
        <div className="checkOutPrice">
          Price: &#36;{checkOutPrice * quantity}
        </div>
        <div className="checkOutQuantity">
          Quantity:{" "}
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <div className="checkOutButton">
          <button
            onClick={() => {
              history.goBack();
            }}
          >
            {" "}
            Back{" "}
          </button>
          <button onClick={finalCheckout}> Check out </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
