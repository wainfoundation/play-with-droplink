
interface ProfileQrCodeProps {
  url: string;
  visible: boolean;
}

const ProfileQrCode = ({ url, visible }: ProfileQrCodeProps) => {
  if (!visible) return null;
  
  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(url)}`}
          alt="Profile QR Code"
          className="mx-auto mb-2"
        />
        <p className="text-sm text-gray-500">Scan to visit my profile</p>
      </div>
    </div>
  );
};

export default ProfileQrCode;
