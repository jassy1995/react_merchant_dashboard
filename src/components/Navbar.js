import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("wesabiUser");
    toast.success("successfully logged out");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 w-full">
      <Disclosure as="nav" className="bg-myColor">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8 text-white rounded-full"
                      src="assets/img/crlogo.png"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <button className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium  ring-1 ring-myColor hover:bg-myColor hover:text-slate-200">
                        Dashboard
                      </button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="bg-myColor p-1 rounded-full hover:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    <Menu as="div" className="ml-3 relative">
                      <div className="flex">
                        <Menu.Button className="max-w-xs mr-2 bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </Menu.Button>

                        <Menu.Button
                          className="font-bold text-red-500 bg-white py-1 px-2 rounded-full"
                          onClick={logout}
                        >
                          logout
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            <div>Dashboard</div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  <Disclosure.Button className="bg-myColor inline-flex items-center justify-center p-2 rounded-md text-white-400 hover:text-white hover:bg-myColor focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Disclosure.Button
                  as="a"
                  className="bg-myColor text-white px-3 py-2 rounded-md text-sm font-medium mhover:text-gray-300 hover:bg-myColor hover:text-white"
                  aria-current="page"
                >
                  Dashboard
                </Disclosure.Button>
              </div>
              <div className="pt-4 pb-3 border-t border-white">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto bg-white flex-shrink-0 p-1 rounded-full text-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="ml-auto bg-white flex-shrink-0 p-2 rounded-full text-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    logout
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  <Disclosure.Button
                    as="a"
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700"
                  ></Disclosure.Button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default Navbar;
