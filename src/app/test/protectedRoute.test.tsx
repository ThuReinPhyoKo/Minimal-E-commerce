import "@testing-library/jest-dom";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../components/auth/store/authStore";
import { UserDetails } from "../components/auth/user/userDetail";
import LayoutDashboard from "../dashboard/layout";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
}));

describe("Protected Dashboard Route", () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it("should show dashboard children when authenticated", async () => {
    const auth = useAuthStore.getState();
    
    await act(async () => {
      auth.login(UserDetails);
    });

    render(
      <LayoutDashboard>
        <div data-testid="secret-content">Welcome to the Dashboard</div>
      </LayoutDashboard>
    );

    const currentState = useAuthStore.getState().isAuthenticated;

    expect(currentState).toBe(true);
    expect(await screen.findByTestId("secret-content")).toBeInTheDocument();
  });

  it("should show RequiredLogin component when NOT authenticated", () => {
    useAuthStore.getState().logout();

    render(
      <LayoutDashboard>
        <div data-testid="secret-content">Welcome to the Dashboard</div>
      </LayoutDashboard>
    );

    expect(screen.queryByTestId("secret-content")).not.toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument(); 
  });
});