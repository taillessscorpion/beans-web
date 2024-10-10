"use client";
import { thousand_products } from "@/app/fixed-data";
import { separateNumber } from "@/util/index.util";
import {
  faAngleDown,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import Image from "./Thumb/Image.Thumb";



const Products = () => {
  const [currentCategory, setCurrentCategory] = useState<number>(0);
  const [nextCategory, setNextCategory] = useState<any>(null);
  const [currentProduct, setCurrentProduct] = useState<number>(0);
  const [nextProduct, setNextProduct] = useState<any>(null);
  const [productWidth, setProductWidth] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const refs = useRef(new Array());


  const chooseCategory = (index: number) => {
    setNextCategory(index);
    setNextProduct(0);
  };
  const finishCategoryTransitionHandler = () => {
    if (nextCategory === null) return;
    setCurrentCategory(nextCategory);
    setNextCategory(null);
    setNextProduct(null);
    setCurrentProduct(0);
  };
  const goToPrevious = () => {
    if (nextProduct !== null) return;
    setNextProduct(currentProduct - 1);
  };
  const goToNext = () => {
    if (nextProduct !== null) return;
    setNextProduct(currentProduct + 1);
  };
  const finishProductTransitionHandler = () => {
    if (nextProduct === null) return;
    if (nextProduct < 0)
      setCurrentProduct(thousand_products[currentCategory].products.length - 1);
    else if (nextProduct >= thousand_products[currentCategory].products.length)
      setCurrentProduct(0);
    else setCurrentProduct(nextProduct);
    setNextProduct(null);
  };
  const renderProductList = (
    integrate: number,
    list: { name: string; img_url: string }[],
    c_index: number
  ) => {
    return list.map((product, p_index) => {
      const getRef = (element: any) => {
        if (refs.current[c_index].length < list.length * integrate)
          refs.current[c_index].push(element);
      };
      const activeIndex = nextProduct !== null ? nextProduct : currentProduct;
      return (
        <div
          className={`Product ${integrate}${p_index} ${
            (list.length < 5 && p_index === currentProduct) ||
            (integrate == 2 &&
              (p_index == activeIndex ||
                (nextProduct < 0 && p_index == list.length - 1) ||
                (nextProduct >= list.length && p_index == 0))) ||
            (integrate == 1 && nextProduct < 0 && p_index == list.length - 1) ||
            (integrate == 3 && nextProduct >= list.length && p_index == 0)
              ? " Active"
              : ""
          }`}
          key={`Product-${c_index}-${integrate}-${p_index}`}
          ref={getRef}
        >
          <Image 
              url={product.img_url}
              alt={product.name}
              useIndicator={true}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    if (!refs.current[0][0]) return;
    setProductWidth(refs.current[1][0].offsetWidth);
    setContainerWidth(
      refs.current[0][0].parentElement.parentElement.clientWidth
    );
    window.onresize = () => {
      setProductWidth(refs.current[1][0].offsetWidth);
      setContainerWidth(refs.current[0][0].parentElement.clientWidth);
    };
  }, [refs]);

  return (
    <div
      className="P__Container Container"
      data-device={isMobile ? "mobile" : "desktop"}
    >
      <div
        className="Category__Presentation"
        data-hover={isExpand}
        onClick={() => {
          if (isMobile) {
            setIsExpand(!isExpand);
          }
        }}
      >
        {thousand_products.map((category, index) => (
          <p
            key={`Presentation-${index}`}
            className={`${
              index === nextCategory ||
              (nextCategory === null && index === currentCategory)
                ? "Active"
                : ""
            }`}
            onClick={() => {
              if (nextCategory !== null) return;
              if (currentCategory === index) return;
              chooseCategory(index);
            }}
          >
            {index === nextCategory ||
            (nextCategory === null && index === currentCategory) ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <></>
            )}
            {category.name}
          </p>
        ))}
      </div>
      {nextCategory === null ? (
        <div className="Product__Presentation">
          {nextProduct !== null ? (
            ""
          ) : (
            <div className="Button" onClick={goToPrevious}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
          )}
          <div className="Display">
            <div
              className={`Presentation`}
              style={
                nextProduct !== null
                  ? {
                      translate: `${
                        nextProduct > currentProduct ? -100 / 3 : 100 / 3
                      }% 0%`,
                    }
                  : { transition: "none" }
              }
              onTransitionEnd={finishProductTransitionHandler}
            >
              <div>
                <h2 className="Name">
                  {
                    thousand_products[currentCategory].products[
                      currentProduct === 0
                        ? thousand_products[currentCategory].products.length - 1
                        : currentProduct - 1
                    ]?.name
                  }
                </h2>
              </div>
              <div>
                <h2 className="Name">
                  {
                    thousand_products[currentCategory].products[currentProduct]
                      ?.name
                  }
                </h2>
                <p className="Packaging">
                  {
                    thousand_products[currentCategory].products[currentProduct]
                      ?.packing[0]
                  }
                  {thousand_products[currentCategory].products[currentProduct]
                    ?.packing.length > 1
                    ? " | " +
                      thousand_products[currentCategory].products[
                        currentProduct
                      ]?.packing[1]
                    : ""}
                </p>
                <h3 className="Price">
                  {separateNumber(
                    thousand_products[currentCategory].products[currentProduct]
                      ?.price || 0
                  )}
                  ₫
                </h3>
              </div>
              <div>
                <h2>
                  {
                    thousand_products[currentCategory].products[
                      currentProduct + 1 <
                      thousand_products[currentCategory].products.length
                        ? currentProduct + 1
                        : 0
                    ]?.name
                  }
                </h2>
              </div>
            </div>
          </div>
          {nextProduct !== null ? (
            ""
          ) : (
            <div className="Button" onClick={goToNext}>
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="Categories">
        <div
          className="Container"
          style={{
            translate: `0% -${
              (nextCategory !== null ? nextCategory : currentCategory) * 100
            }%`,
          }}
          onTransitionEnd={finishCategoryTransitionHandler}
        >
          {thousand_products.map((category, c_index) => {
            if (refs.current.length < thousand_products.length)
              refs.current.push([]);
            const productsLength = category.products.length;
            return (
              <div className="Products" key={`Products-${c_index}`}>
                <div
                  className={`Container ${
                    productsLength < 5
                      ? "No-Slide"
                      : nextProduct === null
                      ? "Instant"
                      : ""
                  }`}
                  style={
                    productsLength < 5
                      ? {}
                      : {
                          transform: `translateX(calc(-${100 / 3}% + ${
                            containerWidth / 2 -
                            productWidth / 2 -
                            (nextProduct !== null
                              ? nextProduct
                              : currentProduct) *
                              productWidth
                          }px))`,
                        }
                  }
                >
                  {renderProductList(1, category.products, c_index)}
                  {productsLength < 5
                    ? ""
                    : [
                        renderProductList(2, category.products, c_index),
                        renderProductList(3, category.products, c_index),
                      ]}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
