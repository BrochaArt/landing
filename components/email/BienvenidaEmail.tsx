/**
 * Correo de bienvenida al suscriptor. Se renderiza con React pero termina
 * siendo HTML de correo: por eso los estilos van en línea y la estructura es
 * de tablas simples. Nada de flexbox ni grid, que Outlook no soporta.
 */
export function BienvenidaEmail({ email }: { email: string }) {
  const violeta = "#7454e8";
  const morado = "#371d90";
  const amarillo = "#fdff84";

  return (
    <div
      style={{
        margin: 0,
        padding: "32px 16px",
        backgroundColor: "#f0ecfd",
        fontFamily: "Montserrat, Helvetica, Arial, sans-serif",
        color: "#303030",
      }}
    >
      <table
        role="presentation"
        cellPadding={0}
        cellSpacing={0}
        style={{ width: "100%", maxWidth: 560, margin: "0 auto", borderRadius: 20, overflow: "hidden", backgroundColor: "#ffffff" }}
      >
        <tbody>
          <tr>
            <td style={{ backgroundColor: violeta, padding: "28px 32px" }}>
              <p style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: 2, color: "#ffffff" }}>
                BROCHA
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "36px 32px 8px" }}>
              <h1 style={{ margin: 0, fontSize: 26, lineHeight: 1.2, fontWeight: 800, color: morado }}>
                Ya estás en la lista.
              </h1>
              <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.6 }}>
                Gracias por sumarte. Apenas abramos el acceso a la plataforma te
                escribimos a <strong>{email}</strong> antes que a nadie, junto
                con las invitaciones a nuestros eventos en vivo.
              </p>
              <p style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.6 }}>
                Mientras tanto: Brocha reúne la obra de cada artista
                latinoamericano, su historia, sus eventos y sus productos en un
                solo lugar, con certificados de autenticidad en blockchain.
              </p>
            </td>
          </tr>
          <tr>
            <td style={{ padding: "28px 32px 36px" }}>
              <a
                href="https://brocha-landing.vercel.app"
                style={{
                  display: "inline-block",
                  padding: "13px 26px",
                  borderRadius: 20,
                  backgroundColor: amarillo,
                  color: "#000000",
                  fontSize: 12,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Descubre Brocha
              </a>
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: morado, padding: "20px 32px" }}>
              <p style={{ margin: 0, fontSize: 13, color: violeta }}>
                Somos el arte de conectar.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
