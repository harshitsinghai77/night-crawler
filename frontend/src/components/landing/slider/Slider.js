import React, { Component } from "react";
import Slider from "react-slick";

import { Box, ResponsiveContext } from "grommet";
import { SliderImage } from "./SliderImage";

import { data, images } from "./data";

class InstaSlider extends Component {
  galleryItems() {
    return images.map((item, index) => (
      <SliderImage
        src={item}
        name={data[index] && Object.keys(data[index])}
        score={data[index] && Object.values(data[index])}
        key={index}
      />
    ));
  }

  getNumOfItemsToShow(size) {
    return size === "xsmall"
      ? 2
      : size === "small"
      ? 3
      : size === "medium"
      ? 4
      : 5;
  }

  render() {
    const items = this.galleryItems();
    const settings = {
      className: "center",
      infinite: true,
      slidesToScroll: 1,
      speed: 1200,
      autoplay: true
    };

    return (
      <ResponsiveContext.Consumer>
        {size => (
          <Box pad="large">
            <Slider slidesToShow={this.getNumOfItemsToShow(size)} {...settings}>
              {items}
            </Slider>
          </Box>
        )}
      </ResponsiveContext.Consumer>
    );
  }
}

export { InstaSlider as Slider };
