import React from "react";
import "./About.css";

function About() {
  return (
    <div className="content">
      <img
        src="https://images.unsplash.com/photo-1631730486784-5456119f69ae?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Care Image"
      />
      <div className="details">
        <h1>About Us</h1>
        <h2>
          At Glam Beauty Store, we're committed to redefining beauty standards.
          Our diverse range of premium makeup essentials celebrates
          individuality and self-expression. With a focus on quality and
          innovation, we offer a carefully curated selection of products to suit
          every style and occasion. Whether you're a makeup enthusiast or a
          beauty novice, our knowledgeable team is here to guide you on your
          journey to self-discovery and confidence. Experience the magic of Glam
          Beauty Store today
        </h2>
      </div>
    </div>
  );
}

export default About;
