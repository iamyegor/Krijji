using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class snake_case_fiat_property_names : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_fiat_names_fiats_FiatId",
                table: "fiat_names");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "fiat_names",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "FiatId",
                table: "fiat_names",
                newName: "fiat_id");

            migrationBuilder.RenameIndex(
                name: "IX_fiat_names_FiatId",
                table: "fiat_names",
                newName: "IX_fiat_names_fiat_id");

            migrationBuilder.AddForeignKey(
                name: "FK_fiat_names_fiats_fiat_id",
                table: "fiat_names",
                column: "fiat_id",
                principalTable: "fiats",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_fiat_names_fiats_fiat_id",
                table: "fiat_names");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "fiat_names",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "fiat_id",
                table: "fiat_names",
                newName: "FiatId");

            migrationBuilder.RenameIndex(
                name: "IX_fiat_names_fiat_id",
                table: "fiat_names",
                newName: "IX_fiat_names_FiatId");

            migrationBuilder.AddForeignKey(
                name: "FK_fiat_names_fiats_FiatId",
                table: "fiat_names",
                column: "FiatId",
                principalTable: "fiats",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
