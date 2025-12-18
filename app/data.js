import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
// menu
export const menu = [
  { id: 1, name: 'Home', href: '/' },
  { id: 2, name: 'About', href: '#about' },
  { id: 3, name: 'Portfolio', href: '#portfolio' },
  { id: 4, name: 'Contact', href: '#contact' },
]

// contact
export const linkcontact = [
  {
    id: 1,
    icon: <FaEnvelope />,
    name: "hastabudiawan9@gmail.com",
    href: "mailto:hastabudiawan9@gmail.com"
  },
  {
    id: 2,
    icon: <FaLinkedin />,
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hastabudiawan/"
  },
  {
    id: 3,
    icon: <FaGithub />,
    name: "GitHub",
    href: "https://github.com/hastabdwn"
  }
]