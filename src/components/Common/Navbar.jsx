import React, { useEffect, useState } from "react"
import { FaCartPlus } from "react-icons/fa"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"

import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import ProfileDropDown from "../core/Auth/ProfileDropDown"
import { apiConnector } from "../../services/apiConnector"
import { categories } from "../../services/apis"
import { IoMdArrowDropdownCircle } from "react-icons/io";

const subLinks =[
    {
        title:"python",
        link:"/catalog/python"
    },
     {
        title:"webdevlopment",
        link:"/catalog/webdevelopment"
    }
]

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { cart } = useSelector((state) => state.cart)
  const totalItems = useSelector((state) => state.cart.totalItems)

  const location = useLocation()

//   const [subLinks,setSubLinks] =useState([]);
//   const fetchSubLinks= async()=>{
//         try{
//             const result= await apiConnector("GET",categories.CATEGORIES_API);
//             console.log("printing sublink :",result);
//             setSubLinks(result.data.data);
            
//         }
//         catch(error){
//             console.log("could not log the category list");
//         }
//        }
// useEffect(()=>{
//       fetchSubLinks();
// },[])
  const matchRoute = (route) => location.pathname === route

  return (
    <div className="mb-15 fixed z-50 flex h-14 w-full items-center justify-center  border-b-[1px] border-b-richblack-700 bg-richblack-900 ">
      {/* image */}
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>
        {/* nav links */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <>
                  <div className="group relative flex cursor-pointer items-center gap-1">
                    <p>{link.title}</p>
                         <IoMdArrowDropdownCircle />
                    <div className="auto-w-max invisible absolute left-[50%] top-[50%] z-[1000] flex translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                   {
                                    subLinks.length?(
                                        subLinks.map((subLink,index) =>(
                                            <Link to={`/catalog/${subLink.link
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}  className="whitespace-nowrap rounded-lg bg-transparent px-4 py-4 hover:bg-richblack-50" key={index}>
                                                <p>{subLink.title}</p>
                                            </Link>
                                        ))
                                    ):(<div></div>)
                                   }
                         </div>
                  </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-rchblack-25"
                      }`}
                    >
                      {link.title}
                        
                    </p>
                    
                  </Link>
                )}
                
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="flex items-center gap-x-4">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <FaCartPlus className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
                  <Link to="/login">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Log in
                    </button>
                  </Link>
                )}
                {token === null && (
                  <Link to="/signup">
                    <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                      Sign up
                    </button>
                  </Link>
                )}
                {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
