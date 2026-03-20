export default async function handler(req, res) {
  const { messages } = req.body;

  const lastMessage = messages[messages.length - 1]?.text || "";
  let reply = "";

  // Start interview
  if (lastMessage.toLowerCase().includes("hello")) {
    reply = `Welcome! Let's start your interview.

Question:
Explain OOP concepts in simple terms.`;
  }

  // Python answer case
  else if (lastMessage.toLowerCase().includes("python")) {
    reply = `Score: 7/10

Strengths:
- Good understanding of basics

Weakness:
- Missing real-world examples

Explanation:
Python is a high-level programming language known for its readability and simplicity. It is widely used in web development, data science, AI, and automation.

Improved Answer:
Python is a high-level programming language known for readability. It supports object-oriented and functional programming and is widely used in real-world applications like web development and AI.`;
  }

  // OOP / polymorphism case
  else if (
    lastMessage.toLowerCase().includes("oop") ||
    lastMessage.toLowerCase().includes("oops") ||
    lastMessage.toLowerCase().includes("polymorphism")
  ) {
    reply = `Score: 8/10

Strengths:
- Covered main concepts

Weakness:
- Could improve explanation clarity

Explanation:
Polymorphism means "one thing, many forms". In programming, it allows the same method or function to behave differently depending on the object or input. For example, a function "draw()" can work differently for a circle and a rectangle.

Improved Answer:
OOP stands for Object-Oriented Programming. It includes concepts like Encapsulation, Inheritance, Polymorphism, and Abstraction. These concepts help in writing modular, reusable, and scalable code.`;
  }

  // Default fallback
  else {
    reply = `Score: 6/10

Strengths:
- Attempted answer

Weakness:
- Needs more clarity

Explanation:
Try to clearly define the concept before explaining. Use simple words and structure your answer step by step.

Improved Answer:
Structure your answer with a clear definition, a simple example, and a real-world use case.`;
  }

  res.status(200).json({ reply });
}