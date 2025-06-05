import { Button, Content, Page, Stack } from "@/components";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Content>
        <Stack align="center" className="w-fit text-center">
          <h2>Sorry for disappointing you!</h2>
          <p>This page either is still being worked on, or does not currently exist!</p>

          <p>Feel free to check out the rest of the site!</p>
          <Button
            variant="primary"
            size="medium"
            onClick={() => navigate(-1)}
          >
            <span>Go Back</span>
          </Button>

        </Stack>
      </Content>
    </Page>
  );
}
export default NotFound;