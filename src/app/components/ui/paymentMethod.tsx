'use client'
import { useState } from 'react';
import { CreditCard, Landmark, Smartphone, ScanLine, Check } from 'lucide-react';
import { Button } from './button';

const paymentMethods = [
    { id: 'card' as const,
      label: 'Credit Card',
      icon: CreditCard,
    },
    { id: 'bank' as const,
      label: 'Bank Transfer',
      icon: Landmark,
    },
    { id: 'mobile' as const,
      label: 'Mobile Payment',
      icon: Smartphone,
    },
];

export default function PaymentMethod() {
    const [selectedMethod, setSelectedMethod] = useState<'card' | 'bank' | 'mobile'>('card');
    const [ cardDetails, setCardDetails ] = useState({
        email: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolder: '',
    });

    const fillDemo = () => {
        setSelectedMethod('card');
        setCardDetails({
            email: 'demo@example.com',
            cardNumber: '4242 4242 4242 4242',
            expiryDate: '12/25',
            cvv: '123',
            cardHolder: 'Demo User',
        });
    }

    return (
                <div id="payment-method" className="mb-5">
                    <div className='flex items-center justify-between mt-4 px-6'>
                        <p className="text-sm text-gray-500 font-medium">Payment Method</p>
                        <button onClick={fillDemo} className="text-xs text-blue-600 hover:text-blue-800 cursor-pointer">Use Demo Card</button>
                    </div>

                    
                    <div id="payment-options" className="flex flex-col justify-center mx-6 my-4">
                        
                        <div className="grid grid-cols-3 gap-3 *:bg-white *:border-2 *:rounded-md *:shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                          {paymentMethods.map((method) => (
                            <Button
                                key={method.id}
                                variant="transparent"
                                size="lg"
                                onClick={() => setSelectedMethod(method.id)}
                                className={`${selectedMethod === method.id ? 'border border-gray-900 relative' : 'border-gray-300 hover:bg-gray-100 hover:border-gray-400'} flex flex-col items-center justify-center p-4 h-full w-full group`}
                            >
                                <method.icon className={`${selectedMethod === method.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-600'} w-6 h-6`} />
                                <span className={`${selectedMethod === method.id ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-600'} text-xs font-medium`}>{method.label}</span>
                                {selectedMethod === method.id && (
                                    <div className="absolute top-1 right-2 bg-gray-900 text-white w-4 h-4 flex items-center justify-center rounded-full">
                                        <Check className="w-3 h-3" />
                                    </div>
                                )}
                            </Button>
                          ))}
                        </div>

                        {selectedMethod === 'card' && (
                            <div className="mt-4 flex flex-col gap-3">
                                <label htmlFor='email' className='text-sm text-gray-500 font-medium'>
                                    Email
                                </label>
                                <input
                                    id='email'
                                    value={cardDetails.email}
                                    onChange={(e) => setCardDetails({ ...cardDetails, email: e.target.value })}
                                    aria-label="Email Address"
                                    placeholder="you@example.com"
                                    required
                                    className="h-9 text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                                <label htmlFor='card-number' className='text-sm text-gray-500 font-medium'>
                                    Card Number
                                </label>
                                <input
                                    id='card-number'
                                    value={cardDetails.cardNumber}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                    aria-label="Card Number"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    className="h-9 text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label htmlFor="expiry-date" className='text-sm text-gray-500 font-medium'>Expiry Date</label>
                                        <input
                                            id="expiry-date"
                                            value={cardDetails.expiryDate}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                            aria-label="Expiry Date"
                                            placeholder="MM/YY"
                                            required
                                            className="h-9 w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="CVV" className='text-sm text-gray-500 font-medium'>CVV</label>
                                        <input
                                            id="CVV"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                            aria-label="CVV"
                                            placeholder="CVV"
                                            required
                                            className="h-9 w-full mt-3 text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                        />
                                    </div>
                                </div>
                                <label htmlFor='card-holder' className='text-sm text-gray-500 font-medium'>
                                    Card holder
                                </label>
                                <input
                                    id='card-holder'
                                    value={cardDetails.cardHolder}
                                    onChange={(e) => setCardDetails({...cardDetails, cardHolder: e.target.value})}
                                    aria-label="Card holder"
                                    placeholder="John Doe"
                                    required
                                    className="h-9 text-sm text-gray-900 border border-gray-300 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.04)] px-2.5"
                                />
                            </div>
                        )}

                        {selectedMethod === 'bank' && (
                            <div className="mt-4 flex flex-col gap-3 border-2 border-gray-300 rounded-md py-8">
                                <Landmark className="w-8 h-8 text-gray-700 mx-auto" />
                                <p className="text-sm text-gray-700 text-center">You will be redirected to your bank's secure payment portal after confirming your order.</p>
                            </div>
                        )}

                        {selectedMethod === 'mobile' && (
                            <div className="mt-4 flex flex-col gap-3 border-2 border-gray-300 rounded-md py-8">
                                <ScanLine className="w-8 h-8 text-gray-700 mx-auto" />
                                <p className="text-sm text-gray-700 text-center">Scan the QR code or open your mobile payment app to complete the transaction.</p>
                            </div>
                        )}


                    </div>
                    
                </div>
    )};