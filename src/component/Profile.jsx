import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  Alert,
  Image,
} from "react-bootstrap";
import { profileApi } from "../api";

const GRADIENT = "linear-gradient(135deg, #009247 0%, #00c46a 100%)";

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const InfoRow = ({ icon, label, value, badge }) => (
  <li className="list-group-item d-flex align-items-center py-3 px-4">
    <i
      className={`bi ${icon} me-3`}
      style={{ fontSize: "1.1rem", color: "#009247", minWidth: "22px" }}
    />
    <span
      className="text-muted me-2"
      style={{ minWidth: "110px", fontSize: "0.9rem" }}
    >
      {label}
    </span>
    {badge ? (
      <Badge
        pill
        style={{
          background: GRADIENT,
          fontSize: "0.8rem",
          padding: "5px 12px",
        }}
      >
        {value}
      </Badge>
    ) : (
      <span className="fw-semibold text-dark">{value}</span>
    )}
  </li>
);

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await profileApi.getProfile();
        setProfile(response.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Failed to load profile. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "#f0f4f8" }}
      >
        <div className="text-center">
          <Spinner
            animation="border"
            style={{ width: "3rem", height: "3rem", color: "#009247" }}
          />
          <p className="mt-3 text-muted fw-semibold">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", background: "#f0f4f8" }}
      >
        <Container>
          <Alert variant="danger" className="shadow-sm rounded-3">
            <Alert.Heading>
              <i className="bi bi-exclamation-triangle-fill me-2"></i>Oops!
            </Alert.Heading>
            <p>{error}</p>
          </Alert>
        </Container>
      </div>
    );
  }

  if (!profile) return null;

  const initials = profile.userName.slice(0, 2).toUpperCase();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: GRADIENT,
        padding: "60px 0",
      }}
    >
      <Container>
        {/* Header Card */}
        <Card className="border-0 shadow-lg mb-4 overflow-hidden">
          {/* Banner */}
          <div
            style={{
              height: "140px",
              background: GRADIENT,
            }}
          />
          {/* Avatar + Name row */}
          <Card.Body className="pt-0">
            <Row className="align-items-end">
              <Col xs="auto" style={{ marginTop: "-60px" }}>
                {profile.imagePath ? (
                  <Image
                    src={profile.imagePath}
                    roundedCircle
                    width={120}
                    height={120}
                    style={{
                      border: "4px solid white",
                      objectFit: "cover",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    }}
                  />
                ) : (
                  <div
                    className="d-flex justify-content-center align-items-center rounded-circle fw-bold text-white"
                    style={{
                      width: 120,
                      height: 120,
                      fontSize: "2.5rem",
                      background: GRADIENT,
                      border: "4px solid white",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    }}
                  >
                    {initials}
                  </div>
                )}
              </Col>
              <Col className="ps-3 pb-1">
                <h3 className="mb-0 fw-bold text-dark">@{profile.userName}</h3>
                <p className="text-muted mb-0">{profile.email}</p>
              </Col>
              <Col xs="auto" className="pb-1">
                <Badge
                  pill
                  style={{
                    background: GRADIENT,
                    fontSize: "0.85rem",
                    padding: "8px 16px",
                  }}
                >
                  {profile.group.name}
                </Badge>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Details Cards */}
        <Row className="g-4">
          {/* Personal Info */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header
                className="fw-semibold text-white"
                style={{
                  background: GRADIENT,
                  borderBottom: "none",
                }}
              >
                <i className="bi bi-person-fill me-2"></i>Personal Information
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  <InfoRow icon="bi-hash" label="User ID" value={`#${profile.id}`} />
                  <InfoRow icon="bi-person" label="Username" value={`@${profile.userName}`} />
                  <InfoRow icon="bi-envelope-fill" label="Email" value={profile.email} />
                  <InfoRow icon="bi-telephone-fill" label="Phone" value={profile.phoneNumber} />
                  <InfoRow
                    icon="bi-geo-alt-fill"
                    label="Country"
                    value={profile.country.charAt(0).toUpperCase() + profile.country.slice(1)}
                  />
                </ul>
              </Card.Body>
            </Card>
          </Col>

          {/* Group Info */}
          <Col md={6}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Header
                className="fw-semibold text-white"
                style={{
                  background: GRADIENT,
                  borderBottom: "none",
                }}
              >
                <i className="bi bi-people-fill me-2"></i>Group & Activity
              </Card.Header>
              <Card.Body className="p-0">
                <ul className="list-group list-group-flush">
                  <InfoRow icon="bi-shield-fill" label="Group" value={profile.group.name} badge />
                  <InfoRow icon="bi-hash" label="Group ID" value={`#${profile.group.id}`} />
                  <InfoRow icon="bi-calendar-plus-fill" label="Joined On" value={formatDate(profile.creationDate)} />
                  <InfoRow icon="bi-pencil-fill" label="Last Updated" value={formatDate(profile.modificationDate)} />
                  <InfoRow icon="bi-calendar-check-fill" label="Group Created" value={formatDate(profile.group.creationDate)} />
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Footer note */}
        <p
          className="text-center text-white mt-4 opacity-75"
          style={{ fontSize: "0.85rem" }}
        >
          Profile ID #{profile.id} · Last modified {formatDate(profile.modificationDate)}
        </p>
      </Container>
    </div>
  );
};

export default Profile;
