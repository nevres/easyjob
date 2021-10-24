using Microsoft.EntityFrameworkCore.Migrations;

namespace JobProcessing.Infrastructure.Migrations
{
    public partial class useJustJobDurationType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration_Amount",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Duration_DurationType",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.AddColumn<int>(
                name: "JobDurationType",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JobDurationType",
                schema: "Job",
                table: "Jobs");

            migrationBuilder.AddColumn<int>(
                name: "Duration_Amount",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Duration_DurationType",
                schema: "Job",
                table: "Jobs",
                type: "integer",
                nullable: true);
        }
    }
}
