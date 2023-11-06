import React from "react";
import Header from "../Header";

import "./About.css";
function About() {
  return (
    <div>
      <Header />
      <div class="h-9"></div>
      <div class="maindiv">
        <img
          class="image"
          src="https://visualmodo.com/wp-content/uploads/2018/11/Best-Laptops-for-Blogging-and-Bloggers.jpg"
          alt="display image"
        />

        <div class="paragraph">
          <p>
            Welcome to TechSphere, your premier destination for cutting-edge
            technology. At TechSphere, we redefine your online shopping
            experience by offering an extensive range of top-notch laptops,
            headphones, and accessories. Our specialty lies in providing a
            360-degree perspective through our innovative viewing feature,
            enabling you to explore products in unparalleled detail.
            <br />
            <br />
            Dive into a world of immersive shopping where every angle, curve,
            and feature of our products can be examined from every dimension.
            Our commitment to offering an interactive shopping journey allows
            you to virtually handle and inspect each item as if it were in your
            hands, ensuring that you make informed decisions before purchase.
            <br />
            <br />
            TechSphere prides itself on quality, authenticity, and a seamless
            user experience. We value your satisfaction and aim to revolutionize
            the way you shop for tech products. Join us at TechSphere and unlock
            the door to a whole new dimension in online shopping. Your
            satisfaction is our priority.
           
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
