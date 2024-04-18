import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

const cnft = {
  name: 'Crypto Punk #1234',
  price: '10 ETH',
  rating: 4.8,
  reviewCount: 512,
  href: '#',
  imageSrc: 'https://example.com/crypto-punk-1234.jpg',
  imageAlt: 'Crypto Punk #1234 NFT',
  attributes: [
    { name: 'Background', options: ['Red', 'Blue', 'Green'] },
    { name: 'Accessory', options: ['Hat', 'Glasses', 'Earrings'] },
    { name: 'Clothing', options: ['Shirt', 'Jacket', 'Hoodie'] },
  ],
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function CNFTModal({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [selectedAttributes, setSelectedAttributes] = useState(
    cnft.attributes.map((attribute) => attribute.options[0])
  )

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img src={cnft.imageSrc} alt={cnft.imageAlt} className="object-cover object-center" />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{cnft.name}</h2>

                      <section aria-labelledby="information-heading" className="mt-2">
                        <h3 id="information-heading" className="sr-only">
                          CNFT information
                        </h3>
                        <p className="text-2xl text-gray-900">{cnft.price}</p>

                        {/* Reviews */}
                        <div className="mt-6">
                          <h4 className="sr-only">Reviews</h4>
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={classNames(
                                    cnft.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                  )}
                                  aria-hidden="true"
                                />
                              ))}
                            </div>
                            <p className="sr-only">{cnft.rating} out of 5 stars</p>
                            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                              {cnft.reviewCount} reviews
                            </a>
                          </div>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-10">
                        <h3 id="options-heading" className="sr-only">
                          CNFT options
                        </h3>
                        <form>
                          {/* Attributes */}
                          {cnft.attributes.map((attribute, index) => (
                            <div key={attribute.name} className="mt-4">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-900">{attribute.name}</h4>
                              </div>
                              <RadioGroup
                                value={selectedAttributes[index]}
                                onChange={(value) => {
                                  const newSelectedAttributes = [...selectedAttributes]
                                  newSelectedAttributes[index] = value
                                  setSelectedAttributes(newSelectedAttributes)
                                }}
                                className="mt-4"
                              >
                                <RadioGroup.Label className="sr-only">Choose {attribute.name}</RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4">
                                  {attribute.options.map((option) => (
                                    <RadioGroup.Option
                                      key={option}
                                      value={option}
                                      className={({ active }) =>
                                        classNames(
                                          active ? 'ring-2 ring-indigo-500' : '',
                                          'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                                        )
                                      }
                                    >
                                      {({ active, checked }) => (
                                        <>
                                          <RadioGroup.Label as="span">{option}</RadioGroup.Label>
                                          <span
                                            className={classNames(
                                              active ? 'border' : 'border-2',
                                              checked ? 'border-indigo-500' : 'border-transparent',
                                              'pointer-events-none absolute -inset-px rounded-md'
                                            )}
                                            aria-hidden="true"
                                          />
                                        </>
                                      )}
                                    </RadioGroup.Option>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          ))}

                          <button
                            type="submit"
                            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            Add to wallet
                          </button>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}