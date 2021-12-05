using Microsoft.EntityFrameworkCore.Migrations;

namespace Profile.Infrastructure.Migrations
{
    public partial class AddAdditionalUserInfo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BusinessType",
                schema: "Profile",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ExternalLink",
                schema: "Profile",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                schema: "Profile",
                table: "Users",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessType",
                schema: "Profile",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ExternalLink",
                schema: "Profile",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                schema: "Profile",
                table: "Users");
        }
    }
}
