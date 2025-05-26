
import { CheckIcon, XIcon } from "lucide-react";

interface FeatureItem {
  name: string;
  starter: boolean;
  pro: boolean;
  premium: boolean;
  description: string;
}

interface FeaturesTableProps {
  features: FeatureItem[];
}

const FeaturesTable = ({ features }: FeaturesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-12">
        <thead>
          <tr className="bg-blue-50">
            <th className="p-4 text-left border-b-2 border-blue-200 w-1/4">Feature</th>
            <th className="p-4 text-center border-b-2 border-blue-200">Starter<br/><span className="text-sm font-normal">10π/month</span></th>
            <th className="p-4 text-center border-b-2 border-blue-200 bg-blue-100">Pro<br/><span className="text-sm font-normal">15π/month</span></th>
            <th className="p-4 text-center border-b-2 border-blue-200">Premium<br/><span className="text-sm font-normal">22π/month</span></th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="p-4 border-b border-gray-200">
                <div className="font-medium">{feature.name}</div>
                <div className="text-sm text-gray-500">{feature.description}</div>
              </td>
              <td className="p-4 text-center border-b border-gray-200">
                {feature.starter ? 
                  <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                  <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
              </td>
              <td className="p-4 text-center border-b border-gray-200 bg-blue-50">
                {feature.pro ? 
                  <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                  <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
              </td>
              <td className="p-4 text-center border-b border-gray-200">
                {feature.premium ? 
                  <CheckIcon className="h-5 w-5 text-green-500 mx-auto" /> : 
                  <XIcon className="h-5 w-5 text-gray-300 mx-auto" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturesTable;
