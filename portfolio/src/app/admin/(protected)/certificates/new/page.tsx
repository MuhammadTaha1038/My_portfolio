import CertificateForm from "@/components/CertificateForm"

export default function NewCertificatePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add Certificate</h1>
        <p className="text-gray-400 mt-2">Add a new professional credential to your portfolio</p>
      </div>
      
      <CertificateForm />
    </div>
  )
}
