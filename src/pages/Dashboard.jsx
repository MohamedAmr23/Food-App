import React, { useContext, useEffect, useState } from "react";
import HeaderCard from "../sharedComponent/HeaderCard";
import { UserContext } from "../context/UserContext";
import headerImg from "../assets/header-image.png";
import { recipesApi, categoriesApi, usersApi } from "../api";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://upskilling-egypt.com:3006";

const Dashboard = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({ recipes: 0, categories: 0, users: 0 });
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [recipesRes, categoriesRes, usersRes] = await Promise.all([
        recipesApi.getAllRecipes(),
        categoriesApi.getAllCategories(),
        usersApi.getAllUser({ pageSize: 1, pageNumber: 1 }),
      ]);
      const allRecipes = recipesRes.data.data || [];
      setStats({
        recipes: allRecipes.length,
        categories: categoriesRes.data.data?.length || 0,
        users: usersRes.data.totalNumberOfRecords || 0,
      });
      setRecentRecipes(allRecipes.slice(0, 4));
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const quickActions = [
    {
      icon: "fa-plus-circle",
      label: "Add New Recipe",
      desc: "Create a new menu item",
      color: "success",
      path: "/dashboard/recipes",
    },
    {
      icon: "fa-list",
      label: "Manage Categories",
      desc: "Organize your menu sections",
      color: "primary",
      path: "/dashboard/categories",
    },
    {
      icon: "fa-users",
      label: "View Users",
      desc: "See all registered users",
      color: "warning",
      path: "/dashboard/users",
    },
    {
      icon: "fa-key",
      label: "Change Password",
      desc: "Update your credentials",
      color: "danger",
      path: "/dashboard/change-password",
    },
  ];

  return (
    <>
      <HeaderCard
        title="Welcome"
        subtitle={userData?.userName}
        describtion1="This is a welcoming screen for the entry of the application ,"
        describtion2="you can now see the options"
        image={headerImg}
      />
      {userData?.userGroup === "SuperAdmin" && (
        <div className="container-fluid px-4 py-4">
          <div className="row g-3 mb-4">
            {[
              {
                label: "Total Recipes",
                value: stats.recipes,
                icon: "fa-utensils",
                color: "success",
                sub: "Menu items available",
                path: "/dashboard/recipes",
              },
              {
                label: "Categories",
                value: stats.categories,
                icon: "fa-list",
                color: "primary",
                sub: "Active categories",
                path: "/dashboard/categories",
              },
              {
                label: "Registered Users",
                value: stats.users,
                icon: "fa-users",
                color: "warning",
                sub: "Platform members",
                path: "/dashboard/users",
              },
            ].map(({ label, value, icon, color, sub, path }) => (
              <div key={label} className="col-md-4">
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{ cursor: "pointer", transition: "transform 0.15s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-3px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                  onClick={() => navigate(path)}
                >
                  <div className="card-body d-flex align-items-center gap-3 p-4">
                    <div
                      className={`rounded-3 bg-${color} bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0`}
                      style={{ width: 64, height: 64 }}
                    >
                      <i className={`fa ${icon} text-${color} fs-4`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <p
                        className="text-muted small mb-0 text-uppercase fw-semibold"
                        style={{ letterSpacing: "0.05em" }}
                      >
                        {label}
                      </p>
                      <h2 className={`fw-bold mb-0 text-${color}`}>
                        {loading ? (
                          <span className="spinner-border spinner-border-sm"></span>
                        ) : (
                          value
                        )}
                      </h2>
                      <p className="text-muted small mb-0">{sub}</p>
                    </div>
                    <i className="fa fa-arrow-right text-muted opacity-50"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                  <h5 className="fw-bold mb-0">
                    <i className="fa fa-bolt text-warning me-2"></i> Quick
                    Actions
                  </h5>
                  <p className="text-muted small mb-0">Jump to common tasks</p>
                </div>
                <div className="card-body p-3">
                  <div className="d-flex flex-column gap-2">
                    {quickActions.map(({ icon, label, desc, color, path }) => (
                      <button
                        key={label}
                        className="btn btn-light border text-start d-flex align-items-center gap-3 p-3 rounded-3"
                        style={{ transition: "all 0.15s" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.borderColor = `var(--bs-${color})`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.borderColor = "")
                        }
                        onClick={() => navigate(path)}
                      >
                        <div
                          className={`rounded-3 bg-${color} bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0`}
                          style={{ width: 42, height: 42 }}
                        >
                          <i className={`fa ${icon} text-${color}`}></i>
                        </div>
                        <div>
                          <p className="fw-semibold mb-0 small">{label}</p>
                          <p
                            className="text-muted mb-0"
                            style={{ fontSize: "0.78rem" }}
                          >
                            {desc}
                          </p>
                        </div>
                        <i className="fa fa-chevron-right text-muted ms-auto small opacity-50"></i>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="fw-bold mb-0">
                      <i className="fa fa-clock text-success me-2"></i> Recent
                      Recipes
                    </h5>
                    <p className="text-muted small mb-0">
                      Latest items on the menu
                    </p>
                  </div>
                  <button
                    className="btn btn-sm btn-success fw-semibold px-3"
                    onClick={() => navigate("/dashboard/recipes")}
                  >
                    View All
                  </button>
                </div>

                <div className="card-body p-0">
                  {loading ? (
                    <div className="text-center py-5">
                      <div className="spinner-border text-success"></div>
                    </div>
                  ) : recentRecipes.length > 0 ? (
                    <div className="list-group list-group-flush">
                      {recentRecipes.map((recipe) => (
                        <div
                          key={recipe.id}
                          className="list-group-item list-group-item-action d-flex align-items-center gap-3 px-4 py-3"
                        >
                          {/* Image */}
                          {recipe.imagePath ? (
                            <img
                              src={`${BASE_URL}/${recipe.imagePath}`}
                              alt={recipe.name}
                              className="rounded-3 object-fit-cover flex-shrink-0"
                              style={{ width: 52, height: 52 }}
                            />
                          ) : (
                            <div
                              className="rounded-3 bg-success bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0"
                              style={{ width: 52, height: 52 }}
                            >
                              <i className="fa fa-utensils text-success"></i>
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-grow-1" style={{ minWidth: 0 }}>
                            <p className="fw-semibold mb-0 text-truncate">
                              {recipe.name}
                            </p>
                            <p className="text-muted small mb-0 text-truncate">
                              {recipe.description || "No description"}
                            </p>
                          </div>

                          {/* Price */}
                          <span className="badge bg-success bg-opacity-10 text-success fw-semibold px-3 py-2 rounded-pill flex-shrink-0">
                            ${recipe.price}
                          </span>

                          {/* Category */}
                          {recipe.category?.length > 0 && (
                            <span className="badge bg-primary bg-opacity-10 text-primary fw-normal px-2 py-1 rounded-pill flex-shrink-0 d-none d-md-inline">
                              {recipe.category[0].name}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="fa fa-utensils text-muted fs-2 mb-3 d-block opacity-25"></i>
                      <p className="text-muted small mb-0">No recipes yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
