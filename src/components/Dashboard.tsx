import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import CNFTModal from './CNFT'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useNavigate } from 'react-router-dom'
import ThreeScene from './ThreeScene'

const navigation = [
  { name: 'Whitelist', href: '#', icon: 'ri-list-check' },
  { name: 'Create', href: '#', icon: 'ri-add-circle-line' },
  { name: 'Explore', href: '#', icon: 'ri-compass-3-line' },
  { name: 'About', href: '#', icon: 'ri-information-line' },
]

export default function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cnftModalOpen, setCnftModalOpen] = useState(false)
  const { account, disconnect } = useWallet()
  const navigate = useNavigate()

  const handleDisconnectWallet = async () => {
    try {
      await disconnect()
      navigate('/')
    } catch (error) {
      console.error('Failed to disconnect wallet:', error)
    }
  }

  return (
    <div className="text-gray-300 font-inter bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      {/* Sidenav */}
      <div className="fixed left-0 top-0 w-64 h-full bg-gray-900/80 backdrop-filter backdrop-blur-lg p-4 z-50 sidebar-menu transition-transform glassmorphism">
        <a href="#" className="flex items-center pb-4 border-b border-b-gray-700">
          <h2 className="font-bold text-2xl text-white">
            GAME<span className="text-indigo-400">HUB</span>
          </h2>
        </a>
        <ul className="mt-4">
          {navigation.map((item) => (
            <li key={item.name} className="mb-1 group">
              <a
                href={item.href}
                className="flex font-semibold items-center py-2 px-4 text-gray-300 hover:bg-gray-800/50 rounded-md group-[.active]:bg-gray-800/80 group-[.active]:text-indigo-400 group-[.selected]:bg-gray-800/50 group-[.selected]:text-indigo-400"
              >
                <i className={`${item.icon} mr-3 text-lg`}></i>
                <span className="text-sm">{item.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* End Sidenav */}

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 min-h-screen transition-all main">
        {/* Navbar */}
        <div className="py-2 px-6 bg-gray-900/80 backdrop-filter backdrop-blur-lg flex items-center shadow-md shadow-black/20 sticky top-0 left-0 z-30 glassmorphism">
          <button
            type="button"
            className="text-lg text-gray-300 font-semibold sidebar-toggle"
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="ri-menu-line"></i>
          </button>

          <ul className="ml-auto flex items-center">
            <li className="dropdown ml-3">
              <button type="button" className="dropdown-toggle flex items-center">
                <div className="flex-shrink-0 w-10 h-10 relative">
                  <div className="p-1 bg-gray-800/50 rounded-full focus:outline-none focus:ring glassmorphism">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={account?.address ? `https://avatars.dicebear.com/api/pixel-art/${account.address}.svg` : ''}
                      alt=""
                    />
                    <div className="top-0 left-7 absolute w-3 h-3 bg-green-400 border-2 border-gray-900 rounded-full animate-ping"></div>
                    <div className="top-0 left-7 absolute w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  </div>
                </div>
                <div className="p-2 md:block text-left">
                  <h2 className="text-sm font-semibold text-gray-300">{account?.address}</h2>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </button>
              <ul className="dropdown-menu shadow-md shadow-black/20 z-30 hidden py-1.5 rounded-md bg-gray-800/80 border border-gray-700 w-full max-w-[140px] glassmorphism">
                <li>
                  <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-300 hover:text-indigo-400 hover:bg-gray-800/50">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-[13px] py-1.5 px-4 text-gray-300 hover:text-indigo-400 hover:bg-gray-800/50">
                    Settings
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleDisconnectWallet}
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-300 hover:text-indigo-400 hover:bg-gray-800/50 cursor-pointer w-full text-left"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        {/* End Navbar */}

        {/* Content */}
        <div className="p-6">
          <ThreeScene />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800/50 rounded-md border border-gray-700 p-6 shadow-md shadow-black/20 glassmorphism">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold text-gray-300">2</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Users</div>
                </div>
              </div>
              <a href="/gebruikers" className="text-indigo-400 font-medium text-sm hover:text-indigo-500">
                View
              </a>
            </div>
            <div className="bg-gray-800/50 rounded-md border border-gray-700 p-6 shadow-md shadow-black/20 glassmorphism">
              <div className="flex justify-between mb-4">
                <div>
                  <div className="flex items-center mb-1">
                    <div className="text-2xl font-semibold text-gray-300">100</div>
                    <div className="p-1 rounded bg-emerald-500/10 text-emerald-500 text-[12px] font-semibold leading-none ml-2">
                      +30%
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">Companies</div>
                </div>
              </div>
              <a href="/dierenartsen" className="text-indigo-400 font-medium text-sm hover:text-indigo-500">
                View
              </a>
            </div>
            <div className="bg-gray-800/50 rounded-md border border-gray-700 p-6 shadow-md shadow-black/20 glassmorphism">
              <div className="flex justify-between mb-6">
                <div>
                  <div className="text-2xl font-semibold text-gray-300 mb-1">100</div>
                  <div className="text-sm font-medium text-gray-400">Blogs</div>
                </div>
              </div>
              <a href="" className="text-indigo-400 font-medium text-sm hover:text-indigo-500">
                View
              </a>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="p-6 relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-800/50 w-full shadow-lg rounded glassmorphism">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-4 py-2">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-300">Users</h3>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 bg-gray-800/80 text-gray-400 align-middle border border-solid border-gray-700 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Role
                        </th>
                        <th className="px-4 bg-gray-800/80 text-gray-400 align-middle border border-solid border-gray-700 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Amount
                        </th>
                        <th className="px-4 bg-gray-800/80 text-gray-400 align-middle border border-solid border-gray-700 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-gray-300">
                        <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                          Administrator
                        </th>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          1
                        </td>
                        <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <div className="flex items-center">
                            <span className="mr-2">70%</span>
                            <div className="relative w-full">
                              <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                <div
                                  style={{ width: '70%' }}
                                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                                ></div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      {/* More table rows */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 shadow-md shadow-black/20 p-6 rounded-md glassmorphism">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium text-gray-300">Activities</div>
              </div>
              <div className="overflow-hidden">
                <table className="w-full min-w-[540px]">
                  <tbody>
                    <tr>
                      <td className="py-2 px-4 border-b border-b-gray-700">
                        <div className="flex items-center">
                          <a href="#" className="text-gray-300 text-sm font-medium hover:text-indigo-400 ml-2 truncate">
                            Lorem Ipsum
                          </a>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-700">
                        <span className="text-[13px] font-medium text-gray-400">02-02-2024</span>
                      </td>
                      <td className="py-2 px-4 border-b border-b-gray-700">
                        <span className="text-[13px] font-medium text-gray-400">17.45</span>
                      </td>
                    </tr>
                    {/* More table rows */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-gray-800/50 border border-gray-700 shadow-md shadow-black/20 p-6 rounded-md lg:col-span-2 glassmorphism">
              <div className="flex justify-between mb-4 items-start">
                <div className="font-medium text-gray-300">Order Statistics</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="rounded-md border border-dashed border-gray-700 p-4">
                  <div className="flex items-center mb-0.5">
                    <div className="text-xl font-semibold text-gray-300">10</div>
                    <span className="p-1 rounded text-[12px] font-semibold bg-blue-500/10 text-blue-500 leading-none ml-1">
                      $80
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">Active</span>
                </div>
                <div className="rounded-md border border-dashed border-gray-700 p-4">
                  <div className="flex items-center mb-0.5">
                    <div className="text-xl font-semibold text-gray-300">50</div>
                    <span className="p-1 rounded text-[12px] font-semibold bg-emerald-500/10 text-emerald-500 leading-none ml-1">
                      +$469
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">Completed</span>
</div>
<div className="rounded-md border border-dashed border-gray-700 p-4">
<div className="flex items-center mb-0.5">
<div className="text-xl font-semibold text-gray-300">4</div>
<span className="p-1 rounded text-[12px] font-semibold bg-rose-500/10 text-rose-500 leading-none ml-1">
-$130
</span>
</div>
<span className="text-gray-400 text-sm">Canceled</span>
</div>
</div>
<div>
<canvas id="order-chart"></canvas>
</div>
</div>
<div className="bg-gray-800/50 border border-gray-700 shadow-md shadow-black/20 p-6 rounded-md glassmorphism">
<div className="flex justify-between mb-4 items-start">
<div className="font-medium text-gray-300">Earnings</div>
</div>
<div className="overflow-x-auto">
<table className="w-full min-w-[460px]">
<thead>
<tr>
<th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-800/80 text-left rounded-tl-md rounded-bl-md">
Service
</th>
<th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-800/80 text-left">
Earning
</th>
<th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-800/80 text-left rounded-tr-md rounded-br-md">
Status
</th>
</tr>
</thead>
<tbody>
<tr>
<td className="py-2 px-4 border-b border-b-gray-700">
<div className="flex items-center">
<img src="https://placehold.co/32x32" alt="" className="w-8 h-8 rounded object-cover block" />
<a href="#" className="text-gray-300 text-sm font-medium hover:text-indigo-400 ml-2 truncate">
Create landing page
</a>
</div>
</td>
<td className="py-2 px-4 border-b border-b-gray-700">
<span className="text-[13px] font-medium text-emerald-500">+$235</span>
</td>
<td className="py-2 px-4 border-b border-b-gray-700">
<span className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none">
Pending
</span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div>
</main>
<CNFTModal open={cnftModalOpen} setOpen={setCnftModalOpen} />
</div>
)
}