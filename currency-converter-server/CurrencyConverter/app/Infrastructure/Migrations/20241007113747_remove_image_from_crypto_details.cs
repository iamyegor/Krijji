using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class remove_image_from_crypto_details : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "image",
                table: "crypto_details");

            migrationBuilder.CreateIndex(
                name: "IX_update_timestamps_name",
                table: "update_timestamps",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_update_timestamps_name",
                table: "update_timestamps");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "crypto_details",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
