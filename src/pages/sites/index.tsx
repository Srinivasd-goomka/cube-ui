import CubeCard from "../../components/ui/card/CubeCard";
import CubeTable from "../../components/ui/table/CubeTable";

const SitesPage: React.FC = () => {
  const SITE_COLUMNS = [
    {
      label: "Service Address",
      key: "service_address",
      width: 60,
      isLink: true,
      linkPath: (row: Record<string, unknown>) => {
        const id = row["id"];
        return `/sites/site/${String(id)}`;
      },
      linkClass: "font-normal",
    },
    { label: "City", key: "service_address_city", width: 130 },
    { label: "State", key: "service_address_state", width: 90 },
    { label: "Zip", key: "zipcode", width: 70 },
  ];

  return (
    <div>
      <h2>Sites Page</h2>
      <CubeCard>
        <CubeTable
          url="/sites"
          columns={SITE_COLUMNS}
          searchType="server"
          isSearch={true}
          isPagination={true}
        />
      </CubeCard>
    </div>
  );
};

export default SitesPage;
