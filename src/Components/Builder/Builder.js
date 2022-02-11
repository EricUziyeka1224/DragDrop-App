import axios from "axios";
import * as htmlToImage from "html-to-image";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import rose from "../../Assets/Images/chains/14kt-rose-chain.png";
import white from "../../Assets/Images/chains/14kt-white-chain.png";
import yellow from "../../Assets/Images/chains/14kt-yellow-chain.png";
import banner from "../../Assets/Images/home_banner.png";
import { onChangeHandler } from "../../Redux-action/action";

function Builder() {
  const [color, setColor] = useState("");
  const [flag, setFlag] = useState(false);
  const [options, setOptions] = useState({ data: [], categoryId: 0 });
  const [dropBox, setDropBox] = useState([]);
  const [productImageArray, setProductImageArray] = useState([]);
  const [price, setPrice] = useState();
  const [productDisplay, setProductDisplay] = useState("");
  const [loadingJwellary, setLoadingJwellary] = useState(true);
  const [loading, setLoading] = useState(true);
  const [checkoutLoader, setCheckoutLoader] = useState(false);
  const [productVarientPosition, setProductVariantPosition] = useState({});
  const product = useSelector((state) => state.productSelection);
  const [checkImage, setCheckImage] = useState("");
  const checkOutImage = useSelector((state) => state.checkOutImage);
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentNeckLace, setCurrentNeckLace] = useState();

  const dragStartEvent = (event) => {
    event.dataTransfer.setData("Text", event.target.id);
  };

  const items = options.data.map((e, index) => {
    return (
      <>
        <img
          price={e.price}
          shopifyId={e.shopify_id}
          category_id={options.categoryId}
          key={index}
          productId={e._id}
          id={`item_${index}`}
          src={e.image}
          draggable="true"
          onDragStart={dragStartEvent}
          onTouchStart={dragStartEvent}
          center={e.center.toString()}
        />
      </>
    );
  });

  const checkProduct = (ce, br, ch) => {
    if (product === "CENTER NECKLACES") {
      return ce;
    } else if (product === "BRACELETS") {
      return br;
    } else if (product === "CHARM NECKLACES") {
      return ch;
    }
  };

  const getJwellary = (url, categoryId) => {
    setLoadingJwellary(true);
    axios
      .get(url)
      .then((response) => {
        setOptions({
          data: response.data,
          categoryId: categoryId,
        });
        setLoadingJwellary(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingJwellary(false);
      });
  };
  const calculatePrice = () => {
    var a = document
      .getElementsByClassName("builderPhoto")[0]
      .getElementsByTagName("IMG");
    var arr = [...a];
    var arr2 = arr.filter((e) => e.id.includes("custom"));
    setPrice(
      productDisplay.price +
        arr2
          .map((e) => Number(e.getAttribute("price")))
          .reduce((a, b) => a + b, 0)
    );
    dispatch(
      onChangeHandler({
        target: {
          value:
            productDisplay.price +
            arr2
              .map((e) => Number(e.getAttribute("price")))
              .reduce((a, b) => a + b, 0),
          name: "checkOutPrice",
        },
      })
    );
  };

  useEffect(() => {
    dispatch(
      onChangeHandler({
        target: {
          value: checkImage.outerHTML,
          name: "checkOutImage",
        },
      })
    );
  }, [checkImage]);

  useEffect(async () => {
    setLoading(() => true);
    await getJwellary(
      "https://mtd1.com/api/media/public_images?category_id=2&center=",
      2
    );
    const productUrl = checkProduct(
      "https://mtd1.com/api/products/chains?type=v-chain",
      "https://mtd1.com/api/media/public_images?category_id=6&center=",
      "https://mtd1.com/api/products/chains?type=u-chain"
    );
    axios
      .get(productUrl)
      .then((response) => {
        setProductImageArray(response.data);
        setColor("yellow");
        setFlag(true);
        // setLoadingJwellary(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoadingJwellary(false);
      });
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [productDisplay]);
  useEffect(() => {
    if (product === "CENTER NECKLACES") {
      setProductVariantPosition({
        top: "5%",
      });
      setDropBox(() => [
        {
          id: 11,
          top: "80.5%",
          right: "42.25%",
          transform: "rotate(0deg)",
          center: "true",
          height: "16%",
          width: "16%",
        },
        {
          id: 6,
          top: "68%",
          right: "34%",
          transform: "rotate(-50deg)",
          center: "false",
        },
        {
          id: 5,
          top: "68%",
          right: "57%",
          transform: "rotate(50deg)",
          center: "false",
        },
        {
          id: 7,
          top: "54.5%",
          right: "25%",
          transform: "rotate(-52deg)",
          center: "false",
        },
        {
          id: 4,
          top: "54.5%",
          right: "66%",
          transform: "rotate(52deg)",
          center: "false",
        },
        {
          id: 8,
          top: "41%",
          right: "15.25%",
          transform: "rotate(-54deg)",
          center: "false",
        },
        {
          id: 3,
          top: "41%",
          right: "75.50%",
          transform: "rotate(54deg)",
          center: "false",
        },
        {
          id: 9,
          top: "28%",
          right: "6%",
          transform: "rotate(-56deg)",
          center: "false",
        },
        {
          id: 2,
          top: "28%",
          right: "85%",
          transform: "rotate(56deg)",
          center: "false",
        },
        {
          id: 10,
          top: "15%",
          right: "-3.75%",
          transform: "rotate(-56deg)",
          center: "false",
        },
        {
          id: 1,
          top: "15%",
          right: "94%",
          transform: "rotate(56deg)",
          center: "false",
        },
      ]);
    } else if (product === "BRACELETS") {
      setProductVariantPosition({
        top: "47.5%",
        right: "28%",
      });
      setDropBox(() => [
        {
          top: "54%",
          right: "5%",
          transform: "rotate(-72deg)",
          center: "false",
        },
        {
          top: "68.5%",
          right: "10%",
          transform: "rotate(-56deg)",
          center: "false",
        },
        {
          top: "80.5%",
          right: "21%",
          transform: "rotate(-35deg)",
          center: "false",
        },
        {
          top: "87%",
          right: "36%",
          transform: "rotate(-12deg)",
          center: "false",
        },
        {
          top: "87%",
          right: "53%",
          transform: "rotate(11deg)",
          center: "false",
        },
        {
          top: "79.25%",
          right: "68%",
          transform: "rotate(35deg)",
          center: "false",
        },
        {
          top: "65.75%",
          right: "79%",
          transform: "rotate(55deg)",
          center: "false",
        },
        {
          top: "49%",
          right: "83.75%",
          transform: "rotate(75deg)",
          center: "false",
        },
        {
          top: "33.5%",
          right: "81.75%",
          transform: "rotate(96deg)",
          center: "false",
        },
        {
          top: "39%",
          right: "5%",
          transform: "rotate(265deg)",
          center: "false",
        },
      ]);
    } else if (product === "CHARM NECKLACES") {
      setProductVariantPosition({
        top: "5%",
      });
      setDropBox(() => [
        {
          top: "63%",
          right: "16.5%",
          transform: "rotate(-71deg)",
          center: "false",
        },
        {
          top: "63%",
          right: "73.55%",
          transform: "rotate(72deg)",
          center: "false",
        },
        {
          top: "10%",
          right: "3.5%",
          transform: "rotate(-76deg)",
          center: "false",
        },
        {
          top: "10%",
          right: "87%",
          transform: "rotate(78deg)",
          center: "false",
        },
        {
          top: "81%",
          right: "25%",
          transform: "rotate(-53deg)",
          center: "false",
        },
        {
          top: "81%",
          right: "65.25%",
          transform: "rotate(50deg)",
          center: "false",
        },
        {
          top: "46%",
          right: "78.25%",
          transform: "rotate(76deg)",
          center: "false",
        },
        {
          top: "46%",
          right: "11.75%",
          transform: "rotate(-74deg)",
          center: "false",
        },
        {
          top: "28%",
          right: "7.25%",
          transform: "rotate(-76deg)",
          center: "false",
        },
        {
          top: "28%",
          right: "82.75%",
          transform: "rotate(76deg)",
          center: "false",
        },
      ]);
    }
  }, [product]);

  useEffect(() => {
    // setLoading(() => true);
    if (color === "rose") {
      setProductDisplay(productImageArray[2]);
      setCurrentNeckLace(productImageArray[2]);
    } else if (color === "yellow") {
      setProductDisplay(productImageArray[0]);
      setCurrentNeckLace(productImageArray[0]);
    } else if (color === "white") {
      setProductDisplay(productImageArray[1]);
      setCurrentNeckLace(productImageArray[1]);
    }
    flag &&
      setTimeout(() => {
        setLoading(() => false);
      }, 1000);
    // if (color === "rose") {
    //   setProductDisplay(checkProduct(vchain_rose, bracelet_rose, uchain_rose));
    // } else if (color === "yellow") {
    //   setProductDisplay(
    //     checkProduct(vchain_yellow, bracelet_yellow, uchain_yellow)
    //   );
    // } else if (color === "white") {
    //   setProductDisplay(
    //     checkProduct(vchain_white, bracelet_white, uchain_white)
    //   );
    // }
  }, [flag, color, productImageArray]);
  const pustJewelleryInCircle = (event, eleString) => {
    event.target.innerHTML = eleString;
    event.target.firstElementChild.style.width = "100%";
    event.target.firstElementChild.style.transform = "translate(0px, -5px)";
    event.target.style.border = "0";
    let oldId = event.target.firstElementChild.id;
    event.target.firstElementChild.id =
      "custom_" + oldId + "_" + event.target.id;
    event.target.firstElementChild.addEventListener("dragstart", (newE) => {
      newE.dataTransfer.setData(
        "Text",
        "custom_" + oldId + "_" + event.target.id
      );
    });
    calculatePrice();
  };

  const pustJewelleryInParent = (parentEvent, eleString) => {
    parentEvent.innerHTML = eleString;
    parentEvent.firstElementChild.style.width = "100%";
    parentEvent.firstElementChild.style.transform = "translate(0px, -5px)";
    parentEvent.style.border = "0";
    let oldId = parentEvent.firstElementChild.id;
    parentEvent.firstElementChild.id = "custom_" + oldId + "_" + parentEvent.id;
    parentEvent.firstElementChild.addEventListener("dragstart", (newE) => {
      newE.dataTransfer.setData(
        "Text",
        "custom_" + oldId + "_" + parentEvent.id
      );
    });
    calculatePrice();
  };

  const responsive = {
    0: { items: 3 },
    568: { items: 5 },
    1080: { items: 7 },
  };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${banner})`,
        backgroundSize: loading ? "cover" : "contain",
        backgroundRepeat: "no-repeat",
        height: loading ? "500px" : "100%",
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
      {/* <img src={banner} width="100%" style={{ minHeight: "150px" }} /> */}
      <div style={{ paddingTop: "150px" }}>
        <div
          className="builderMain container"
          style={{ position: "relative" }}
          onDrop={(event) => {
            event.preventDefault();
            const droppedElement = document.getElementById(
              event.dataTransfer.getData("Text")
            );
            if (droppedElement && droppedElement.id.includes("custom_")) {
              droppedElement.parentElement.style.border = "1px solid";
              droppedElement.remove();
              calculatePrice();
            }
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <div className="builderPhoto">
            {loading ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <div
                style={{
                  width: "550px",
                  maxWidth: "100vw",
                  position: "relative",
                }}
              >
                <div id="capture">
                  <img
                    src={productDisplay.image}
                    style={{
                      width: "100%",
                      maxHeight: "550px",
                      height: "100vw",
                    }}
                  />
                  {dropBox.length &&
                    dropBox.map((styles, index) => {
                      return (
                        <div
                          className="ch droppable"
                          id={styles?.id}
                          key={index}
                          style={styles}
                          center={styles.center}
                          onDrop={(event) => {
                            event.preventDefault();
                            const eleString =
                              event.dataTransfer.getData("text/html");
                            if (
                              eleString.includes("<img") &&
                              eleString.includes("id=")
                            ) {
                              if (event.target?.id.includes("custom_")) {
                                if (
                                  event.target.parentElement.getAttribute(
                                    "center"
                                  ) === "true"
                                ) {
                                  if (eleString.includes('center="true"')) {
                                    let parentElement =
                                      event.target.parentElement;
                                    parentElement.removeChild(event.target);
                                    pustJewelleryInParent(
                                      parentElement,
                                      eleString
                                    );
                                  }
                                } else {
                                  if (!eleString.includes('center="true"')) {
                                    let parentElement =
                                      event.target.parentElement;
                                    parentElement.removeChild(event.target);
                                    pustJewelleryInParent(
                                      parentElement,
                                      eleString
                                    );
                                  }
                                }
                              } else {
                                if (
                                  event.target.getAttribute("center") === "true"
                                ) {
                                  if (eleString.includes('center="true"')) {
                                    pustJewelleryInCircle(event, eleString);
                                  }
                                } else {
                                  if (!eleString.includes('center="true"')) {
                                    pustJewelleryInCircle(event, eleString);
                                  }
                                }
                              }
                            }
                          }}
                        ></div>
                      );
                    })}
                </div>
                <div
                  className="builderSelectColor"
                  style={productVarientPosition}
                >
                  <img
                    src={yellow}
                    alt="yellow"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setColor(e.target.alt);
                    }}
                  />
                  <img
                    src={white}
                    alt="white"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setColor(e.target.alt);
                    }}
                  />
                  <img
                    src={rose}
                    alt="rose"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setColor(e.target.alt);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="builderOptions">
            {loadingJwellary ? (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              <>
                <div className="builderOptionsButtons">
                  <button
                    onClick={() => {
                      getJwellary(
                        "https://mtd1.com/api/media/public_images?category_id=2&center=",
                        2
                      );
                    }}
                  >
                    Charms
                  </button>
                  {product === "CENTER NECKLACES" && (
                    <button
                      onClick={() =>
                        getJwellary(
                          "https://mtd1.com/api/media/public_images?category_id=3&center=",
                          3
                        )
                      }
                    >
                      Centers
                    </button>
                  )}
                  <button
                    onClick={() =>
                      getJwellary(
                        "https://mtd1.com/api/media/public_images?category_id=4&center=",
                        4
                      )
                    }
                  >
                    Large Initials
                  </button>
                  <button
                    onClick={() =>
                      getJwellary(
                        "https://mtd1.com/api/media/public_images?category_id=5&center=",
                        5
                      )
                    }
                  >
                    Small Initials
                  </button>
                </div>

                <div className="builderOptionsImages">
                  <AliceCarousel
                    responsive={responsive}
                    items={items}
                    infinite={true}
                    controlsStrategy="alternate"
                    disableDotsControls={true}
                  />
                </div>
                <div className="builderCheckout">
                  <div>
                    <button onClick={handleShow}>Save</button>
                    <button
                      onClick={() => {
                        setCheckoutLoader(true);
                        // alert(JSON.stringify(currentNeckLace));

                        var currentDropedItems = [];

                        var currrentDropedElements =
                          document.querySelectorAll(".droppable > img");

                        for (
                          var i = 0;
                          i < currrentDropedElements.length;
                          i++
                        ) {
                          currentDropedItems[i] = {
                            _id: currrentDropedElements[i].getAttribute(
                              "productId"
                            ),
                            shopify_id:
                              currrentDropedElements[i].getAttribute(
                                "shopifyId"
                              ),
                            position: currrentDropedElements[i]
                              .getAttribute("id")
                              .split("_")[3],
                            price:
                              currrentDropedElements[i].getAttribute("price"),
                            image_url:
                              currrentDropedElements[i].getAttribute("src"),
                            category:
                              currrentDropedElements[i].getAttribute(
                                "category_id"
                              ),
                          };
                        }
                        const shopifyDropedItems = [];
                        for (let i = 1; i <= 11; i++) {
                          let item = currentDropedItems?.filter(
                            (el) => el.position == i
                          );
                          if (item?.length > 0) {
                            shopifyDropedItems.push(item[0]);
                          } else {
                            shopifyDropedItems.push(null);
                          }
                        }
                        shopifyDropedItems.push({
                          category: currentNeckLace?.category_id,
                          image_url: currentNeckLace?.image,
                          position: "12",
                          price: currentNeckLace?.price,
                          shopify_id: currentNeckLace?.shopify_id,
                          _id: currentNeckLace?._id,
                        });

                        dispatch(
                          onChangeHandler({
                            target: {
                              value:
                              shopifyDropedItems,
                              name: "shopifyDropedItems",
                            },
                          })
                        );
                        var node = document.getElementById("capture");
                        // .cloneNode(true);
                        // node.id = "c";
                        [...node.getElementsByTagName("DIV")].map((e) => {
                          e.style.border = "none";
                        });
                        htmlToImage
                          .toPng(node)
                          .then(function (dataUrl) {
                            var img = new Image();
                            img.src = dataUrl;
                            // document.body.appendChild(img);
                            setCheckImage(img);
                            setCheckoutLoader(false);
                            history.push("builder/checkout");
                          })
                          .catch(function (error) {
                            setCheckoutLoader(false);
                            console.error("oops, something went wrong!", error);
                          });
                      }}
                      className="checkout-btn-spinner"
                    >
                      {checkoutLoader && (
                        <div
                          className="spinner-border small-btn-spinner"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      )}
                      Check Out
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>meirat</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <center>
                          <button> Login with Facebook</button>
                        </center>
                      </Modal.Body>
                    </Modal>
                  </div>
                  <div>Price : &#36;{price}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Builder;
