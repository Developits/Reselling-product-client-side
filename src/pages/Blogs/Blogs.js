import React from "react";

const Blog = () => {
  return (
    <div className="mx-6 pb-6">
      <h1 className="my-10 text-center text-3xl">
        Some important question about Web Development.
      </h1>
      <div className="mt-5 p-6 bg-base-300 border-2 rounded-xl">
        <h3 className="font-bold">
          Question 01: What are the different ways to manage a state in a React
          application?
        </h3>
        <p>
          <strong>Ans</strong>: There are Four Kinds of React State to Manage:
          <br />
          1. Local state <br />
          2. Global state <br />
          3. Server state <br />
          4. URL state <br />
          Local state: Local state is data we manage in one or another
          component. Local state is most often managed in React using the
          useState hook. <br />
          Global state:Global state is data we manage across multiple
          components. Global state is necessary when we want to get and update
          data anywhere in our app, or in multiple components at least <br />
          Server state: Data that comes from an external server that must be
          integrated with our UI state. Server state is a simple concept, but
          can be hard to manage alongside all of our local and global UI state.
          <br />
          URL state: Data that exists on our URLs, including the pathname and
          query parameters. URL state is often missing as a category of state,
          but it is an important one. In many cases, a lot of major parts of our
          application rely upon accessing URL state. Try to imagine building a
          blog without being able to fetch a post based off of its slug or id
          that is located in the URL!
        </p>
      </div>
      <div className="mt-5 p-6 bg-base-300  border-2 rounded-xl">
        <h3 className="font-bold">
          Question 02 : How does prototypical inheritance work?
        </h3>
        <p>
          <strong>Ans</strong>: In a class-based model, you have Classes, which
          are represented by the triple “Parents, Variables, Methods”. Where:
          <br />
          Parents is the list of classes you're extending. Classes may only
          extend other classes;
          <br />
          Variables is the number of variable slots that instances will have.
          For example, a “class Point2d(int x, int y) ...” has 2 instance
          variables;
          <br />
          Methods is a table of “name → function” that describes which services
          each instance of the class will support; Instances (or Objects) in a
          class-based model are represented with the tuple “Class, Values”.
          Where:
          <br />
          Class is a pointer to the class triple that defines how many variables
          this instance supports, and what methods you can call on it;
          <br />
          Values is a list of the values for each variable the instance has. In
          this model, Classes only describe how instances look like, and
          Instances are the only thing you can interact with. Classes cannot be
          instances, and you can't inherit from Instances.
        </p>
      </div>
      <div className="mt-5 p-6 bg-base-300  border-2 rounded-xl">
        <h3 className="font-bold">
          Question 03 : What is a unit test? Why should we write unit tests?
        </h3>
        <p>
          <strong>Ans</strong>: Unit testing is a software development process
          in which the smallest testable parts of an application, called units,
          are individually and independently scrutinized for proper operation.
          This testing methodology is done during the development process by the
          software developers and sometimes QA staff. The main objective of unit
          testing is to isolate written code to test and determine if it works
          as intended. Advantages to unit testing include: <br />
          1. The earlier a problem is identified, the fewer compound errors
          occur. <br />
          2. Costs of fixing a problem early can quickly outweigh the cost of
          fixing it later. <br />
          3. Debugging processes are made easier. <br />
          4. Developers can quickly make changes to the code base. <br />
          5.Developers can also re-use code, migrating it to new projects.
        </p>
      </div>
      <div className="mt-5 p-6 bg-base-300  border-2 rounded-xl">
        <h3 className="font-bold">Question 04 : React vs. Angular vs. Vue?</h3>
        <p>
          <strong>Ans</strong>: Angular vs React vs Vue: <br />
          React: React can be used as a UI library to render elements, without
          enforcing a specific project structure, and that's why it's not
          strictly a framework.React Elements are the smallest building blocks
          of React apps. They are more powerful than DOM elements because the
          React DOM makes sure to update them efficiently whenever something
          changes. <br />
          Vue:The Vue.js core library focuses on the View layer only. It's
          called a progressive framework because you can extend its
          functionality with official and third-party packages, such as Vue
          Router or Vuex, to turn it into an actual framework.Although Vue is
          not strictly associated with the MVVM (Model-View-ViewModel) pattern,
          its design was partly inspired by it. With Vue, you'll be working
          mostly on the ViewModel layer, to make sure that the application data
          is processed in a way that allows the framework to render an
          up-to-date View. <br />
          Angular: In this article, I'm discussing Angular 2, and not the first
          version of the framework which is now known as AngularJS. AngularJS,
          the original framework, is an MVC (Model-View-Controller) framework.
          But in Angular 2, there's no strict association with MV*-patterns as
          it is also component-based. Projects in Angular are structured into
          Modules, Components, and Services. Each Angular application has at
          least one root component and one root module.
        </p>
      </div>
    </div>
  );
};

export default Blog;
