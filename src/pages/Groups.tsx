import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GroupsPage from "@/components/groups/GroupsPage";
import GoToTop from '@/components/GoToTop';

const Groups = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="pt-16">
        <GroupsPage />
      </main>
      <GoToTop />
      <Footer />
    </div>
  );
};

export default Groups;
