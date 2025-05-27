"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Send, Eye } from "lucide-react"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  rate: number
  amount: number
}

interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  issueDate: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
  items: InvoiceItem[]
  subtotal: number
  tax: number
  total: number
  notes?: string
}

const mockInvoice: Invoice = {
  id: "inv_001",
  number: "INV-2024-001",
  clientName: "John Doe",
  clientEmail: "john.doe@email.com",
  issueDate: "2024-01-15",
  dueDate: "2024-02-15",
  status: "sent",
  items: [
    {
      id: "1",
      description: "Initial Consultation - 60 minutes",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
    {
      id: "2",
      description: "Follow-up Session - 45 minutes",
      quantity: 2,
      rate: 120,
      amount: 240,
    },
  ],
  subtotal: 390,
  tax: 31.2,
  total: 421.2,
  notes: "Thank you for your business. Payment is due within 30 days.",
}

export function InvoiceGenerator() {
  const [invoice, setInvoice] = useState<Invoice>(mockInvoice)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "sent":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "draft":
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
      default:
        return "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Invoice Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Invoice {invoice.number}</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Issued on {formatDate(invoice.issueDate)} • Due {formatDate(invoice.dueDate)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge className={getStatusColor(invoice.status)}>{invoice.status.toUpperCase()}</Badge>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <Card>
        <CardContent className="p-8">
          {/* Business Info */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">From</h3>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <div className="font-medium">Dr. Sarah Wilson</div>
                <div>Licensed Therapist</div>
                <div>123 Medical Plaza</div>
                <div>New York, NY 10001</div>
                <div>sarah@therapycenter.com</div>
                <div>(555) 123-4567</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Bill To</h3>
              <div className="space-y-1 text-slate-600 dark:text-slate-300">
                <div className="font-medium">{invoice.clientName}</div>
                <div>{invoice.clientEmail}</div>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="grid grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Invoice Number</div>
              <div className="font-medium text-slate-900 dark:text-white">{invoice.number}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Issue Date</div>
              <div className="font-medium text-slate-900 dark:text-white">{formatDate(invoice.issueDate)}</div>
            </div>
            <div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Due Date</div>
              <div className="font-medium text-slate-900 dark:text-white">{formatDate(invoice.dueDate)}</div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Invoice Items */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Services</h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                      Description
                    </th>
                    <th className="text-right py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Qty</th>
                    <th className="text-right py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Rate</th>
                    <th className="text-right py-3 text-sm font-medium text-slate-500 dark:text-slate-400">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-4 text-slate-900 dark:text-white">{item.description}</td>
                      <td className="py-4 text-right text-slate-600 dark:text-slate-300">{item.quantity}</td>
                      <td className="py-4 text-right text-slate-600 dark:text-slate-300">
                        {formatCurrency(item.rate)}
                      </td>
                      <td className="py-4 text-right font-medium text-slate-900 dark:text-white">
                        {formatCurrency(item.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Invoice Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Subtotal</span>
                <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-300">Tax (8%)</span>
                <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(invoice.tax)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-slate-900 dark:text-white">Total</span>
                <span className="text-slate-900 dark:text-white">{formatCurrency(invoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <>
              <Separator className="my-8" />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Notes</h3>
                <p className="text-slate-600 dark:text-slate-300">{invoice.notes}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
