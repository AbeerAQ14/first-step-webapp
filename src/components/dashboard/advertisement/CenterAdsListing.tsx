import AdDetailsWrapper from "./AdDetailsWrapper";

const CenterAdsListing = () => {
  const advertisements = [
    {
      id: "1",
      title: "تجربة ١",
      description: "هذا وصف لتجربة ١",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
      status: "pending",
    },
    {
      id: "2",
      title: "تجربة ٢",
      description: "هذا وصف لتجربة ٢",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
      status: "accepted",
    },
    {
      id: "3",
      title: "تجربة ٣",
      description: "هذا وصف لتجربة ٣",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
      status: "rejected",
    },
    {
      id: "4",
      title: "تجربة ٤",
      description: "هذا وصف لتجربة ٤",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
      status: "pending",
    },
    {
      id: "5",
      title: "تجربة ٥",
      description: "هذا وصف لتجربة ٥",
      image:
        "https://images.unsplash.com/photo-1746822132410-0aa489a964f2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      start_date: new Date(),
      end_date: new Date(),
      status: "accepted",
    },
  ];

  return (
    <div className="space-y-4">
      <h1 className="heading-4 text-primary font-medium text-center">
        الحضانة أو المركز
      </h1>

      <div className="flex flex-col gap-y-12">
        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">
            إعلانات في انتظار القبول
          </p>

          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {advertisements.map((ad) => {
              if (ad.status === "pending") {
                return (
                  <AdDetailsWrapper
                    key={ad.id}
                    adId={ad.id}
                    initialValues={ad}
                    mode="show"
                    adType="pending"
                  />
                );
              }
            })}
          </div>
        </div>

        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">إعلانات مقبولة</p>

          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {advertisements.map((ad) => {
              if (ad.status === "accepted") {
                return (
                  <AdDetailsWrapper
                    key={ad.id}
                    adId={ad.id}
                    initialValues={ad}
                    mode="show"
                    adType="accepted"
                  />
                );
              }
            })}
          </div>
        </div>

        <div className="space-y-4">
          <p className="heading-4 text-primary font-medium">إعلانات مرفوضة</p>

          <div className="flex flex-col gap-y-6 lg:px-5 xl:px-9">
            {advertisements.map((ad) => {
              if (ad.status === "rejected") {
                return (
                  <AdDetailsWrapper
                    key={ad.id}
                    adId={ad.id}
                    initialValues={ad}
                    mode="show"
                    adType="rejected"
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterAdsListing;
