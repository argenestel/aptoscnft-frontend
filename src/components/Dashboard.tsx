import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import CNFTModal from './CNFT'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { useNavigate } from 'react-router-dom'

const navigation = [
  { name: 'Whitelist', href: '#' },
  { name: 'Create', href: '#' },
  { name: 'Explore', href: '#' },
  { name: 'About', href: '#' },
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
    <div className="bg-base-100 dark:bg-dark-base-100 min-h-screen">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary shadow">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            {/* Add your logo here */}
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-base-100"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-base-100">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {account && (
              <>
                <span className="text-sm font-semibold leading-6 text-base-100">{account.address}</span>
                <button
                  onClick={handleDisconnectWallet}
                  className="ml-4 rounded-md bg-accent px-3.5 py-2.5 text-sm font-semibold text-base-100 shadow-sm hover:bg-opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Disconnect
                </button>
              </>
            )}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-base-100 dark:bg-dark-base-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                {/* Add your logo here */}
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-700/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                {account && (
                  <div className="py-6">
                    <span className="block px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100">
                      {account.address}
                    </span>
                    <button
                      onClick={handleDisconnectWallet}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl">
              Welcome to Your Dashboard
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              Manage your composable NFTs, create new ones, and explore the marketplace.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <button
                  onClick={() => setCnftModalOpen(true)}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-dark-primary to-dark-secondary px-8 py-3 text-base font-medium text-base-100 hover:from-dark-primary hover:to-dark-accent md:py-4 md:px-10 md:text-lg"
                >
                  Create CNFT
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Your dashboard content */}
      </main>

      <CNFTModal open={cnftModalOpen} setOpen={setCnftModalOpen} />
    </div>
  )
}